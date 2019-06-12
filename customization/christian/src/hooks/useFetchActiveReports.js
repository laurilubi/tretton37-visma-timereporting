import { useEffect, useState } from 'react';
import getHtml from '../utils/getHtml';

function useFetchActiveReports() {
  const [options, setOptions] = useState([]);

  async function fetchActiveReports() {
    const html = await getHtml('https://pxcontrol1337.afdrift.se/reportbase/StartRight.asp');
    const select = html.querySelector('form .startnav select');

    return Array.from(select.children).map(opt => {
      const url = new URL(`https://pxcontrol1337.afdrift.se/reportbase?${opt.value}`);

      const yearWeek = url.searchParams.get('id2');
      const letter = url.searchParams.get('id3').split('|')[0] || 'A';
      const createdData = url.searchParams.get('id3').split('|')[1] || null;

      return {
        url: `/timebase/frameset.asp?${opt.value}`,
        title: `${yearWeek}-${letter}`,
        status: opt.textContent.replace(`${yearWeek}-${letter}`, '').trim(),
        created: createdData,
      };
    });
  }

  async function getData() {
    const res = await fetchActiveReports();
    setOptions(res);
  }
  useEffect(() => {
    getData();
  }, []);

  return options;
}

export default useFetchActiveReports;
