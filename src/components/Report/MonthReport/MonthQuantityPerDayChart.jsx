import LineChart from '~/components/UI/Chart/LineChart';

const _ = require('lodash');

export default function MonthQuantityPerDayChart({ data }) {
  const chartOptions = {
    labels: _.keys(data.dailyReport),
    colors: ['#ffa16c'],
  };

  return (
    <LineChart
      series={[
        {
          name: 'Số lượng',
          data: _.values(_.mapValues(data.dailyReport, (dateRevenue) => dateRevenue.sales)),
        },
      ]}
      options={chartOptions}
    />
  );
}
