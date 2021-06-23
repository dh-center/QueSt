import React, { useEffect, useState } from 'react';
import { FlatList, Platform, RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { Spinner } from 'native-base';
import { graphql, QueryRenderer } from 'react-relay';
import {
  QuestsListQuery,
  QuestsListQueryResponse, TaskTypes
} from './__generated__/QuestsListQuery.graphql';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { QuestsStackParamList } from '../navigation/questsStack';
import styled from 'styled-components/native';
import textStyles, { StyledFonts } from '../styles/textStyles';
import Colors from '../styles/colors';
import QuestsListItem from '../components/QuestsListItem';
import { useRelayEnvironment } from 'react-relay/hooks';
import useTabBarHeight from '../components/utils/useTabBarHeight';
import BlueCircle15 from '../images/blueCircle15.svg';
import DropDownPicker from 'react-native-dropdown-picker';
import Next from '../images/next.svg';

/**
 * Type with props of screen 'List' in QuestsStackScreen
 */
type ListScreenNavigationProp = StackNavigationProp<QuestsStackParamList, 'List'>;

/**
 * Type with props of screen 'List' in QuestsStackScreen
 */
type Props = StackScreenProps<QuestsStackParamList, 'List'>;

const Body = styled.View<{tabBarHeight: number}>`
  background-color: ${Colors.Background};
  flex: 1;
  padding-bottom: ${props => props.tabBarHeight}px;
`;

const SpinnerView = styled.View`
  background-color: ${Colors.Background};
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Header = styled.View`
  background-color: ${Colors.White};
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  padding: 74px 15px 30px;
  elevation: ${4};
  box-shadow: 0 2px 5px rgba(0,0,0,0.24);
  ${Platform.OS === 'ios' && 'z-index: 1;'}
`;

const BlueCircle = styled(BlueCircle15)`
  position: absolute;
  top: -376px;
  right: -169px;
`;

const Title = styled.Text`
  ${StyledFonts.roboto};
  font-size: 28px;
  line-height: 34px;
  color: ${Colors.Black};
`;

const Row = styled.View`
  flex-direction: row;
  margin: 15px 0;
  max-width: 100%;
  ${Platform.OS === 'ios' && 'z-index: 1;'}
`;

const DropDown = styled(DropDownPicker)`
  background-color: ${Colors.White};
  height: 40px;
  border-radius: 15px;
  padding: 0 15px;
  elevation: ${2};
  box-shadow: 0 2px 3px rgba(0,0,0,0.2);
  border: transparent;
  ${Platform.OS === 'ios' && 'z-index: 2;'}
`;

const LanguageButton = styled.TouchableOpacity`
  background-color: ${Colors.White};
  width: 50px;
  height: 40px;
  border-radius: 15px;
  margin-left: 9px;
  elevation: ${2};
  box-shadow: 0 2px 3px rgba(0,0,0,0.2);
  align-items: center;
  justify-content: center;
`;

const LanguageButtonText = styled.Text`
  ${StyledFonts.uiWebMedium};
  font-size: 18px;
  line-height: 22px;
  color: ${Colors.Black};
`;

const ErrorText = styled.Text`
  ${StyledFonts.uiWebMedium};
  font-size: 18px;
  line-height: 22px;
  color: ${Colors.Black};
  margin: 0 15px;
`;

const TypeButton = styled.TouchableOpacity<{active: boolean}>`
  background-color: ${props => props.active ? Colors.Blue : Colors.Background};
  padding: 9px 15px;
  margin: 0 5px;
  border-radius: 15px;
`;

const TypeButtonText = styled.Text<{active: boolean}>`
  ${StyledFonts.uiWebMedium};
  font-size: 18px;
  line-height: 22px;
  color: ${props => props.active ? Colors.White : Colors.Black};
`;

const ArrowDown = styled(Next)`
  transform: rotate(90deg);
`;

const ArrowUp = styled(Next)`
  transform: rotate(-90deg);
`;

const styles = StyleSheet.create({
  flatListStyle: {
    marginHorizontal: -15,
  },
  flatListContentStyle: {
    paddingHorizontal: 10,
  },
  containerStyle: {
    flex: 1,
  },
  listItemLabelStyle: {
    position: 'absolute',
    left: 15,
  },
  listItemContainerStyle: {
    borderColor: '#BDBDBD',
    borderTopWidth: 0.3,
  },
  dropDownContainerStyle: {
    borderColor: 'transparent',
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
  },
});

/**
 * Component of the quests list
 *
 * @param props - data with query results
 */
function QuestsListScreen(props: QuestsListQueryResponse & {retry: (() => void) | null, needRefresh: boolean}): React.ReactElement {
  const navigation = useNavigation<ListScreenNavigationProp>();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'RU' | 'ENG'>('RU');
  const [currentQuestType, setCurrentQuestType] = useState<TaskTypes | undefined>();
  const tabBarHeight = useTabBarHeight();
  const questTypesList: (TaskTypes | undefined)[] = [undefined, 'QUEST', 'ROUTE', 'STORY', 'QUIZ'];

  enum Values {
    RELEVANCE,
    // NEAR,
    AVAILABLE,
    LONG,
    AToZ,
    ZToA
  }
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<Values>(Values.AVAILABLE);
  const [items, setItems] = useState([
    { label: t('quests.RELEVANCE'),
      value: Values.RELEVANCE },
    // { label: t('quests.NEAR'),
    //   value: Values.NEAR },
    { label: t('quests.AVAILABLE'),
      value: Values.AVAILABLE },
    { label: t('quests.LONG'),
      value: Values.LONG },
    { label: t('quests.AToZ'),
      value: Values.AToZ },
    { label: t('quests.ZToA'),
      value: Values.ZToA },
  ]);

  useEffect(() => {
    if (props.retry && props.needRefresh) {
      setIsLoading(true);
      props.retry();
      setIsLoading(false);
    }
  }, [ props.needRefresh ]);

  /**
   * The order in which the quests should be shown
   */
  enum StatesOrder {
    PASSED,
    AVAILABLE,
    LOCKED,
  }

  const data = [ ...props.quests.edges ];
  const filteredData = data.filter(quest => quest.node.language === language && (currentQuestType ? quest.node.type === currentQuestType : true));
  const sortedData = filteredData.sort(
    (a, b) => {
      const sortByProgress = (): number => {
        if (a.node.questProgressState === b.node.questProgressState) {
          return a.node.minLevel - b.node.minLevel;
        }

        return StatesOrder[a.node.questProgressState] - StatesOrder[b.node.questProgressState];
      };

      switch (Values[value]) {
        case 'RELEVANCE':
          if (a.node.recommendationScore === b.node.recommendationScore) {
            return sortByProgress();
          }

          return b.node.recommendationScore - a.node.recommendationScore;
        // case 'NEAR':
        //   break;
        case 'AVAILABLE':
          return sortByProgress();
        case 'LONG':
          if (a.node.durationInMinutes === b.node.durationInMinutes) {
            return sortByProgress();
          }

          return a.node.durationInMinutes - b.node.durationInMinutes;
        case 'AToZ':
          if (a.node.name === b.node.name) {
            return sortByProgress();
          }

          return a.node.name > b.node.name ? 1 : -1;
        case 'ZToA':
          if (a.node.name === b.node.name) {
            return sortByProgress();
          }

          return a.node.name > b.node.name ? -1 : 1;
        default:
          return sortByProgress();
      }
    }
  );

  return (
    <Body tabBarHeight={tabBarHeight}>
      <Header>
        <BlueCircle/>
        <Title>{t('quests.title')}</Title>
        <Row>
          <DropDown
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            showTickIcon={false}
            textStyle={textStyles.default}
            containerStyle={styles.containerStyle}
            listItemLabelStyle={styles.listItemLabelStyle}
            listItemContainerStyle={styles.listItemContainerStyle}
            dropDownContainerStyle={[
              styles.dropDownContainerStyle,
              Platform.OS === 'android' && { maxHeight: 80 },
              Platform.OS === 'ios' && { overflow: 'visible' },
            ]}
            ArrowDownIconComponent={() => <ArrowDown/>}
            ArrowUpIconComponent={() => <ArrowUp/>}
          />
          <LanguageButton onPress={() => setLanguage(language === 'RU' ? 'ENG' : 'RU')}>
            <LanguageButtonText>{language}</LanguageButtonText>
          </LanguageButton>
        </Row>
        <FlatList horizontal
          style={styles.flatListStyle}
          contentContainerStyle={styles.flatListContentStyle}
          showsHorizontalScrollIndicator={false}
          data={questTypesList}
          renderItem={({ item }): React.ReactElement => (
            <TypeButton active={item === currentQuestType} onPress={() => setCurrentQuestType(item)}>
              <TypeButtonText active={item === currentQuestType}>{t([`quests.${item}`, 'quests.all'])}</TypeButtonText>
            </TypeButton>
          )}
          keyExtractor={(item, index): string => index.toString()}
        />
      </Header>

      <FlatList
        contentContainerStyle={{ paddingTop: 15 }}
        data={sortedData}
        renderItem={({ item }): React.ReactElement => (
          <>
            <QuestsListItem
              onPress={(): void => navigation.navigate('Description', {
                id: item.node.id,
                title: item.node.name,
                description: item.node.description,
                state: item.node.questProgressState,
                exp: item.node.earnedExp,
                credits: item.node.credits?.blocks,
                wayToTravel: item.node.wayToTravel,
                distanceInKilometers: item.node.distanceInKilometers,
                durationInMinutes: item.node.durationInMinutes,
              })
              }
              name={item.node.name}
              type={item.node.type}
              minLevel={item.node.minLevel}
              progressState={item.node.questProgressState}
            />
          </>
        )}
        refreshing={isLoading}
        onRefresh={(): void => {
          setIsLoading(true);
          if (props.retry) {
            props.retry();
          }
          /**
           * @todo set false only when receiving data
           */
          setIsLoading(false);
        }}
        keyExtractor={(item, index): string => index.toString()}
      />
    </Body>
  );
}

/**
 * Component of the error screen
 *
 * @param props - data with query results
 */
function ErrorScreen(props: {retry: (() => void) | null}): React.ReactElement {
  const [isLoading, setIsLoading] = useState(false);
  const tabBarHeight = useTabBarHeight();

  return (
    <Body tabBarHeight={tabBarHeight}>
      <ScrollView>
        <RefreshControl refreshing={isLoading} onRefresh={(): void => {
          setIsLoading(true);
          if (props.retry) {
            props.retry();
          }
          /**
           * @todo set false only when receiving data
           */
          setIsLoading(false);
        }}/>
        <Title>
        К сожалению, произошла ошибка 😔
        </Title>
        <ErrorText>
        Пожалуйста, попробуйте повторить попытку спустя некоторое время
        </ErrorText>
      </ScrollView>
    </Body>
  );
}

const query = graphql`
  query QuestsListQuery {
    quests {
      edges {
        node {
          id
          language
          name
          description
          type
          recommendationScore
          minLevel
          questProgressState
          earnedExp
          wayToTravel
          distanceInKilometers
          durationInMinutes
          credits {
            blocks
          }
        }
      }
    }
  }
`;

/**
 * Functional component of the query result
 *
 * @param route - route props of screen 'List'
 */
export default function Quests({ route }: Props): React.ReactElement {
  const environment = useRelayEnvironment();

  return (
    <QueryRenderer<QuestsListQuery>
      environment={environment}
      query={query}
      variables={{}}
      render={({ error, props, retry }): React.ReactElement => {
        if (error) {
          return (
            <ErrorScreen retry={retry}/>
          );
        }
        if (props) {
          return <QuestsListScreen {...props} retry={retry} needRefresh={route.params?.needRefresh || false}/>;
        }

        return (
          <SpinnerView>
            <Spinner color={Colors.DarkBlue}/>
          </SpinnerView>
        );
      }}
    />
  );
}
