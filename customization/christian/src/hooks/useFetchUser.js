import { useEffect, useState } from 'react';

function useFetchUser(defaultValue) {
  const [user, setUser] = useState(defaultValue);

  async function fetchUsername() {
    const elem = document.createElement('div');
    const body = await fetch('https://pxcontrol1337.afdrift.se/reportbase/top_leftreport.asp')
      .then(res => res.arrayBuffer())
      .then(buffer => {
        const decoder = new TextDecoder('iso-8859-1');
        return decoder.decode(buffer);
      });

    elem.innerHTML = body;
    const username = elem
      .querySelector('table tr:last-child td')
      .innerHTML.trim()
      .split('<br>')[0];

    return username;
  }

  async function getUser() {
    const userName = await fetchUsername();
    setUser(userName);
  }
  useEffect(() => {
    getUser();
  }, []);

  return user;
}

export default useFetchUser;
