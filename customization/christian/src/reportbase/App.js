import React, { Fragment } from 'react';

import Header from '../components/Header';
import Main from '../components/Main';
import Card, { CardTitle, CardContent, CardActions } from '../components/Card';
import Theme from '../components/Theme';
import ReportList from './ReportList';
import { LinkButton } from '../components/Button';

import useFetchActiveReports from '../hooks/useFetchActiveReports';

function App() {
  const options = useFetchActiveReports();

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
