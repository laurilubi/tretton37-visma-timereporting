import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

const headerHeight = '4rem';

const Wrapper = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background: ${({ theme }) => theme.secondaryColor};
  color: ${({ theme }) => theme.whiteColor};

  ${({ theme }) => theme.sm`
    flex-direction: row;
    align-items: stretch;
    justify-content: space-between;
    min-height: ${headerHeight};
  `}
`;

const Logo = styled.img`
  max-height: 2rem;
  margin: 1rem auto 1rem 1rem;
`;

const HeaderButton = styled.button`
  border: 0;
  outline: none;
  appearance: none;
  font-size: inherit;
  background: transparent;
  color: #ffffff;
  line-height: 1.5;
  :hover {
    cursor: pointer;
    background: ${({ theme }) => darken(0.05, theme.secondaryColor)};
  }
`;

const NavItem = styled.span`
  display: flex;
  align-items: center;
  text-align: center;
  padding: 0 1rem;
  font-size: inherit;
  background: transparent;
  color: #ffffff;
  line-height: 1.5;
`;

function Header({ user }) {
  function logout() {
    window.location = '/login/logout.asp';
  }
  return (
    <Wrapper>
      <Logo src="https://1337works.com/images/_tretton37_logo_green.png" alt="tretton37" />

      <NavItem dangerouslySetInnerHTML={{ __html: user }} />
      <HeaderButton type="button" onClick={logout}>
        Log out
      </HeaderButton>
    </Wrapper>
  );
}

export { headerHeight };
export default Header;
