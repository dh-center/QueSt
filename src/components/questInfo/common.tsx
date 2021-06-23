import styled from 'styled-components/native';
import Colors from '../../styles/colors';
import { StyledFonts } from '../../styles/textStyles';

export const Line = styled.View<{vertical?: boolean}>`
  height: ${props => props.vertical ? 50 : 1}px;
  width: ${props => props.vertical ? '1px' : '100%'};
  background-color: ${Colors.Blue};
`;

export const Block = styled.View<{isEmpty?: boolean}>`
  margin: ${props => props.isEmpty ? 0 : 30}px 0;
`;

export const Icon = styled.View`
  margin-right: 10px;
`;

export const BasicText = styled.Text<{margined?: boolean, count?: boolean}>`
  ${StyledFonts.uiWebRegular};
  font-size: 18px;
  line-height: 22px;
  color: ${Colors.Black};
  margin-bottom: ${props => props.margined ? 30 : 0}px;
  margin-left: ${props => props.count ? 15 : 0}px;
`;
