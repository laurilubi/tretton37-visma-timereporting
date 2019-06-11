import { useEffect, useState } from 'react';
import getHtml from '../utils/getHtml';

function useFetchUser(defaultValue) {
  const [user, setUser] = useState(defaultValue);

  async function getUser() {
    const html = await getHtml('https://pxcontrol1337.afdrift.se/reportbase/top_leftreport.asp');
    const username = html
      .querySelector('table tr:last-child td')
      .innerHTML.trim()
      .split('<br>')[0];

    setUser(username);
  }
  useEffect(() => {
    getUser();
  }, []);

  return user;
}

export default useFetchUser;
