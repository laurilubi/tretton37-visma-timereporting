import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Link = styled.a`
  color: ${({ theme }) => theme.blackColor};
`;

const Wrapper = styled.li`
  display: flex;
  & > *:last-child {
    margin-left: auto;
  }
`;

function ReportListItem({ option }) {
  return (
    <Wrapper>
      <Link href={option.url}>{option.title}</Link>
      <small style={{ color: 'gray', fontStyle: 'italic' }}>{option.status}</small>
    </Wrapper>
  );
}

function ReportList({ options = [] }) {
  return (
    <List>
      {options.map(option => (
        <ReportListItem option={option} key={option.title} />
      ))}
    </List>
  );
}
export default ReportList;
