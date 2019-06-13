import styled from 'styled-components';
import { opacify } from 'polished';

const CardTitle = styled.h2`
  /* margin-bottom: 1rem; */
  color: ${({ theme }) => theme.primaryColor};
`;

const CardContent = styled.div`
  color: ${({ theme }) => theme.secondaryColor};
  font-size: 0.8em;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const CardActions = styled.div`
  flex-shrink: 0;
  & > *:not(:last-child) {
    margin-right: 1rem;
  }
`;

const Card = styled.a`
  display: block;
  background: ${({ theme }) => theme.fullWhiteColor};
  border-bottom: 1px solid ${({ theme }) => opacify(0.2, theme.secondaryColor)};
  padding: 2rem;
  text-decoration: none;

  :hover,
  :focus {
    background: ${({ theme }) => theme.whiteColor};
  }
`;

export { CardTitle, CardContent, CardActions };
export default Card;
