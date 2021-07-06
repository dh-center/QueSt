import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import MainInfo from './screens/MainInfo';
import AboutQuests from './screens/AboutQuests';
import AboutGeolocation from './screens/AboutGeolocation';
import QuestPassing from './screens/QuestPassing';
import AboutModalize from './screens/AboutModalize';
import Colors from '../styles/colors';
import styled from 'styled-components/native';
import { StyledFonts } from '../styles/textStyles';
import { useAuthContext } from '../contexts/AuthProvider';

const data = [
  {
    index: 1,
    component: <MainInfo/>,
  },
  {
    index: 2,
    component: <AboutQuests/>,
  },
  {
    index: 3,
    component: <AboutGeolocation/>,
  },
  {
    index: 4,
    component: <QuestPassing/>,
  },
  {
    index: 5,
    component: <AboutModalize/>,
  },
];

type Item = typeof data[0];

const dot = {
  backgroundColor: 'rgba(104, 198, 223, 0.3)',
  width: 15,
  height: 15,
  borderRadius: 8,
};

const activeDot = {
  backgroundColor: Colors.Blue,
  width: 15,
  height: 15,
  borderRadius: 8,
};

const DoneButton = styled.TouchableOpacity`
  background-color: ${Colors.Blue};
  padding: 12px;
  border-radius: 30px;
`;

const ButtonText = styled.Text`
  ${StyledFonts.uiWebRegular};
  font-size: 18px;
  color: ${Colors.White};
`;

/**
 *
 */
export default function OnboardingSlider(): React.ReactElement {
  const authContext = useAuthContext();

  const _renderItem = ({ item }: {item: Item}): React.ReactElement => {
    return (
      <>
        {item.component}
      </>
    );
  };

  const _keyExtractor = (item: Item): string => item.index.toString();

  return (
    <AppIntroSlider
      data={data}
      renderItem={_renderItem}
      dotStyle={dot}
      activeDotStyle={activeDot}
      showNextButton={false}
      renderDoneButton={() => <DoneButton onPress={() => authContext.actions.setFirstRegistrationFalse()}><ButtonText>Done</ButtonText></DoneButton>}
      keyExtractor={_keyExtractor}
    />
  );
}
