import React from 'react';
import styled from 'styled-components';
import { green } from '../colors';

const LoginLogoWrapper = styled.div`
  position: relative;
  color: ${green};
  margin-bottom: 2rem;
  & > span {
    font-size: 0.8em;
    position: absolute;
    top: -10px;
    right: 0;
  }
`;

function LoginLogo() {
  return (
    <LoginLogoWrapper>
      <span>Time reporting</span>
      <img src="https://1337works.com/images/_tretton37_logo_green.png" alt="tretton37" />
    </LoginLogoWrapper>
  );
}

export default LoginLogo;
