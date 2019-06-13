import React, { Fragment } from 'react';

import Header from '../components/Header';
import Main from '../components/Main';
import Card, { CardTitle, CardContent } from '../components/Card';
import Theme from '../components/Theme';

import useFetchNextReport from '../hooks/useFetchNextReport';
import useFetchPreviousReports from '../hooks/useFetchPreviousReports';

/* Form inputs and values
userAction typed string: previous | next | expense
nextPeriod (numeric value e.g. 201925) -- if userAction === next
expensePeriod (numeric value e.g. 201925) -- if userAction === expense

If userAction === previous, form action is set_period.asp, else new_report.asp?action=get10
*/

function App() {
  const unfinishedReports = useFetchPreviousReports();
  const nextPeriod = useFetchNextReport();

  // async function openPrevious() {
  //   const url = 'https://pxcontrol1337.afdrift.se/timebase/time/set_period.asp?userAction=previous';
  //   const data = await fetch(url, { method: 'POST' }).then(res => res.json());
  //   console.log(data);
  // }

  // async function openNew() {
  //   const url = 'https://pxcontrol1337.afdrift.se/timebase/time/new_report.asp?userAction=previous';
  //   const data = await fetch(url, { method: 'POST' }).then(res => res.json());
  //   console.log(data);
  // }

  return (
    <Theme>
      <Fragment>
        <Header />
        <Main>
          {nextPeriod && (
            <Card href={nextPeriod.url}>
              <CardTitle>Report next period ({nextPeriod.title})</CardTitle>
              <CardContent>
                <em>{nextPeriod.status}</em> ({nextPeriod.dates})
              </CardContent>
            </Card>
          )}
          {unfinishedReports &&
            unfinishedReports.map(item => (
              <Card href={item.url} key={item.title}>
                <CardTitle>Finish report {item.title}</CardTitle>
                <CardContent>
                  <em>{item.status}</em> (Created: {item.created})
                </CardContent>
              </Card>
            ))}
          <Card>
            <CardTitle>Add new expense report</CardTitle>
            <CardContent>
              Enter period <input type="text"></input>
            </CardContent>
          </Card>
        </Main>
      </Fragment>
    </Theme>
  );
}

export default App;
