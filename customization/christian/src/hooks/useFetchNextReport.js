import { useEffect, useState } from 'react';
import getHtml from '../utils/getHtml';

async function fetchNextReport() {
  const html = await getHtml(
    'https://pxcontrol1337.afdrift.se/timebase/time/select_period.asp?action=get10',
  );

  const nextReportInput = html.querySelector('form input[name="nextPeriod"]');
  const nextReport = nextReportInput.value;
  const dates = nextReportInput.nextElementSibling.nextElementSibling.lastElementChild.textContent;

  return {
    url: `/timebase/time/new_report.asp?action=get10`,
    title: nextReport,
    dates: dates.substr(1, dates.length - 2),
    status: 'Not started',
    created: null,
  };
}

function useFetchNextReport() {
  const [options, setOptions] = useState(null);

  async function getData() {
    const res = await fetchNextReport();
    setOptions(res);
  }
  useEffect(() => {
    getData();
  }, []);

  return options;
}

export default useFetchNextReport;
