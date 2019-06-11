import React from 'react';
import styled from 'styled-components';
import { green } from '../colors';

const Wrapper = styled.div`
  position: relative;
  max-height: 100%;
  color: ${green};
  & > span {
    font-size: 0.6em;
    font-weight: normal;
    position: absolute;
    top: -1em;
    right: 0;
  }
`;

function Logo() {
  return (
    <Wrapper>
      <span>Time reporting</span>
      <img src="https://1337works.com/images/_tretton37_logo_green.png" alt="tretton37" />
    </Wrapper>
  );
}

export default Logo;
