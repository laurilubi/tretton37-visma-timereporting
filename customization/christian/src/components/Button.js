import styled from 'styled-components';
import { darken } from 'polished';
import { green } from '../colors';

const Button = styled.button`
  border: 0;
  background: ${green};
  color: #ffffff;
  outline: none;
  appearance: none;
  font-size: inherit;
  line-height: 1.5;
  border-radius: 2px;
  :hover {
    cursor: pointer;
    background: ${darken(0.2, green)};
  }
`;

export default Button;