import React, { Fragment } from 'react';
import styled from 'styled-components';

import Header from '../components/Header';
import Card, { CardTitle, CardContent, CardActions } from '../components/Card';
import Theme from '../components/Theme';
import ReportList from './ReportList';
import { LinkButton } from '../components/Button';

import useFetchStartpage from '../hooks/useFetchStartpage';

const Main = styled.main`
  padding: 3rem 1rem;
`;

function App() {
  const options = useFetchStartpage();

  return (
    <Theme>
      <Fragment>
        <Header />
        <Main>
          <Card>
            <CardTitle>Active reports</CardTitle>
            <CardContent>{options && <ReportList options={options} />}</CardContent>
          </Card>
          <CardActions>
            <LinkButton primary href="/timebase/frameset.asp">
              New Time/Expense Report
            </LinkButton>
            <LinkButton href="">Edit loading</LinkButton>
          </CardActions>
        </Main>
      </Fragment>
    </Theme>
  );
}

export default App;
