import styled, { css } from 'styled-components';
import { darken } from 'polished';

const buttonResetStyles = css`
  border: 0;
  background: none;
  font-size: inherit;
  outline: none;
  padding-left: 1em;
  padding-right: 1em;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  text-decoration: none;
  -webkit-appearance: none;
  -moz-appearance: none;
`;

const btnStyles = css`
  ${buttonResetStyles}
  background: ${({ theme, primary = false }) => (primary ? theme.primaryColor : theme.whiteColor)};
  color: ${({ theme, primary = false }) => (primary ? theme.whiteColor : theme.primaryColor)};
  line-height: 1.5;
  border-radius: 2px;
  :hover {
    cursor: pointer;
    background: ${({ theme, primary = false }) =>
      darken(0.05, primary ? theme.primaryColor : theme.whiteColor)};
  }
`;

const Button = styled.button`
  ${btnStyles};
`;

const LinkButton = styled.a`
  ${btnStyles};
`;

export { LinkButton, buttonResetStyles };
export default Button;
