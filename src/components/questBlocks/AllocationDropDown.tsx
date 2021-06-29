import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components/native';
import DropDownPicker from 'react-native-dropdown-picker';
import Colors from '../../styles/colors';
import { Dimensions, Platform, StyleSheet, Text } from 'react-native';
import textStyles, { StyledFonts } from '../../styles/textStyles';
import Next from '../../images/next.svg';
import { useTranslation } from 'react-i18next';

const DropDown = styled(DropDownPicker)<{isCorrect?: boolean}>`
  background-color: ${props => {
    switch (props.isCorrect) {
      case true:
        return Colors.Green;
      case false:
        return Colors.Red;
      case undefined:
        return Colors.White;
    }
  }};
  height: 40px;
  border-radius: 15px;
  padding: 0 15px 0 33px;
  elevation: ${2};
  box-shadow: 0 2px 3px rgba(0,0,0,0.2);
  border: transparent;
`;

const ArrowDown = styled(Next)`
  transform: rotate(90deg);
`;

const ArrowUp = styled(Next)`
  transform: rotate(-90deg);
`;

const OptionName = styled.Text`
  background-color: ${Colors.White};
  margin-top: 10px;
  padding: 20px 15px 5px;
  ${StyledFonts.uiWebRegular};
  font-size: 18px;
  line-height: 22px;
  color: ${Colors.Black};
`;

const RightAnswer = styled.Text`
  background-color: ${Colors.White};
  margin-top: -5px;
  padding: 0 15px 10px;
  ${StyledFonts.uiWebRegular};
  font-size: 18px;
  line-height: 18px;
  color: ${Colors.Green};
  z-index: 100;
`;

const styles = StyleSheet.create({
  textStyle: {
    ...textStyles.default,
    textAlign: 'center',
  },
  containerStyle: {
    backgroundColor: Colors.White,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  listItemContainerStyle: {
    borderColor: '#BDBDBD',
    borderTopWidth: 0.3,
    justifyContent: 'center',
  },
  listItemLabelStyle: {
    position: 'absolute',
  },
  dropDownContainerStyle: {
    borderColor: 'transparent',
    marginHorizontal: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
  },
  modalContainerStyle: {
    backgroundColor: Colors.White,
    width: Dimensions.get('screen').width - 30,
    borderColor: 'transparent',
    position: 'absolute',
    top: '50%',
    alignSelf: 'center',
    borderRadius: 15,
    elevation: 8,
    overflow: 'hidden',
  },
  closeIconContainerStyle: {
    width: '100%',
    marginVertical: -1,
  },
});

/**
 * Props for AllocationDropDown component
 */
interface AllocationDropDownProps {
  /**
   * Index of current item
   */
  index: number;

  /**
   * Item name
   */
  name: string;

  /**
   * All items name for choice
   */
  optionItems: { label: string; value: number; }[];

  /**
   * Users answers
   */
  answers: string[];

  /**
   * Function to set users answers
   */
  setAnswers: Dispatch<SetStateAction<string[]>>;

  /**
   * If user already answered, dropdowns is disabled
   */
  isDisabled: boolean;

  /**
   * Indicate correctness of users answer for current item
   */
  state: boolean | undefined
}

/**
 * DropDown list for allocation task
 *
 * @param props - props for component
 */
export default function AllocationDropDown(props: AllocationDropDownProps): React.ReactElement {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>('');
  const [items, setItems] = useState(props.optionItems);

  return (
    <>
      <OptionName key={props.index}>{props.name}</OptionName>
      <DropDown
        isCorrect={props.state}
        zIndex={items.length - props.index}
        zIndexInverse={props.index + 1}
        disabled={props.isDisabled}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onChangeValue={val => {
          if (typeof val === 'number') {
            props.answers[props.index] = items.find(item => item.value === val)?.label || '';
            props.setAnswers(props.answers);
          }
        }}

        placeholder={'—'}
        showTickIcon={false}
        showArrowIcon={!props.isDisabled}

        textStyle={[styles.textStyle, props.isDisabled && { color: Colors.White }]}
        containerStyle={styles.containerStyle}
        listItemContainerStyle={styles.listItemContainerStyle}
        listItemLabelStyle={styles.listItemLabelStyle}

        listMode={Platform.OS === 'android' ? 'MODAL' : 'SCROLLVIEW'}

        scrollViewProps={{
          scrollEnabled: Platform.OS === 'android',
        }}
        dropDownDirection={'BOTTOM'}
        dropDownContainerStyle={[styles.dropDownContainerStyle, Platform.OS === 'ios' && { overflow: 'visible' }]}
        ArrowDownIconComponent={() => <ArrowDown/>}
        ArrowUpIconComponent={() => <ArrowUp/>}

        modalProps={{
          transparent: true,
          presentationStyle: 'overFullScreen',
        }}
        modalContentContainerStyle={[styles.modalContainerStyle, { maxHeight: (items.length + 1) * 40 + 1,
          transform: [ { translateY: (items.length + 1) * (-20) } ] } ]}
        closeIconContainerStyle={styles.closeIconContainerStyle}
        CloseIconComponent={() => <Text style={styles.textStyle}>{props.name}</Text> }
      />
      {props.state === false &&
        <RightAnswer>{t('quests.answer')}: {items.find(item => item.value === props.index)?.label}</RightAnswer>
      }
    </>
  );
}
