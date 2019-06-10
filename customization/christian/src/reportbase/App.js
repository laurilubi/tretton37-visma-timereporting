import React, { Fragment } from 'react';

import Header from '../components/Header';
import Theme from '../components/Theme';
import useFetchUser from '../hooks/useFetchUser';

function App() {
  const user = useFetchUser('');

  return (
    <Theme>
      <Fragment>
        <Header user={user} />
        <main>Hi</main>
      </Fragment>
    </Theme>
  );
}

export default App;
