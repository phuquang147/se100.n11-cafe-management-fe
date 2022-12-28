import LineChart from '~/components/UI/Chart/LineChart';

const _ = require('lodash');

export default function YearQuantityChart({ data }) {
  const chartOptions = {
    labels: _.keys(data.monthlyReport),
    colors: ['#ffa16c'],
  };

  return (
    <LineChart
      series={[
        {
          name: 'Số lượng',
          data: _.values(_.mapValues(data.monthlyReport, (monthRevenue) => monthRevenue.sales)),
        },
      ]}
      options={chartOptions}
    />
  );
}
