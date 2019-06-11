import styled from 'styled-components';

const CardTitle = styled.h3`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.primaryColor};
`;

const CardContent = styled.div`
  color: ${({ theme }) => theme.blackColor};
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

const Card = styled.div`
  background: ${({ theme }) => theme.fullWhiteColor};
  padding: 1rem;
  border-radius: 2px;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export { CardTitle, CardContent, CardActions };
export default Card;
