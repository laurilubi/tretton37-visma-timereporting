/* globals SubmitForm */

import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

import { blue } from '../colors';
import LoginLogo from './LoginLogo';
import Button from '../components/Button';
import Form from '../components/Form';
import Input from '../components/Input';

const SERVER = 'px';
const DATABASE = 'tretton37';
const LANGUAGE = 'ENG';

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  background: ${blue};
`;

function LoginPage() {
  // Set focus on load
  const iRef = useRef(null);
  useEffect(() => {
    iRef.current.focus();
    document.title = 'Ninja Time Reporting'
  }, []);

  return (
    <LoginWrapper>
      <Form action="check_login.asp" method="POST" name="formLogin">
        <LoginLogo />
        <Input type="text" id="username" name="username" placeholder="Ninja ID" ref={iRef} required />
        <Input type="password" id="password" name="password" placeholder="Secret password" required />
        <Input type="hidden" id="server" name="server" value={SERVER} />
        <Input type="hidden" id="database" name="database" value={DATABASE} />
        <Input type="hidden" id="selectLanguage" name="selectLanguage" value={LANGUAGE} />
        <Input type="hidden" id="hdnsettings" name="hdnsettings" value="100,0" />
        <Button type="submit">Log in</Button>
      </Form>
    </LoginWrapper>
  );
}

export default LoginPage;
