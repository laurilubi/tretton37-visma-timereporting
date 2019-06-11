import React from 'react';
import styled from 'styled-components';

import Logo from './Logo';
import Nav, { NavItem, NavLink, navItemHeight } from './Nav';

import useFetchUser from '../hooks/useFetchUser';

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
    min-height: ${navItemHeight};
  `}
`;

function Header() {
  const user = useFetchUser('');
  return (
    <Wrapper>
      <NavLink href="/reportbase/framesetreport.asp?home=true">
        <Logo />
      </NavLink>
      <Nav>
        <NavItem dangerouslySetInnerHTML={{ __html: user }} />
        <NavLink href="/login/logout.asp">Log out</NavLink>
      </Nav>
    </Wrapper>
  );
}

export { navItemHeight as headerHeight };
export default Header;
