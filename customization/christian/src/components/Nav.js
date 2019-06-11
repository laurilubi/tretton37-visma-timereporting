import styled, { css } from 'styled-components';
import { darken } from 'polished';

const navItemHeight = '4rem';

const headerItemStyles = css`
  display: flex;
  align-items: center;
  text-align: center;
  padding: 0 1rem;
  min-height: ${navItemHeight};
  & img {
    max-height: 2rem;
  }
`;

const navItemStyles = css`
  ${headerItemStyles}
  color: ${({ theme }) => theme.whiteColor};
`;

const navButtonLinkStyles = css`
  ${navItemStyles};
  text-decoration: none;
  :hover {
    background: ${({ theme }) => darken(0.05, theme.secondaryColor)};
    text-decoration: underline;
    cursor: pointer;
  }
`;

const NavItem = styled.span`
  ${navItemStyles};
`;

const NavLink = styled.a`
  ${navButtonLinkStyles};
`;

const Nav = styled.div`
  display: flex;
`;

export { NavLink, NavItem, navItemHeight };
export default Nav;
