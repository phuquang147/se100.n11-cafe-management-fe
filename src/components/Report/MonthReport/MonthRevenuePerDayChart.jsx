import { printNumberWithCommas } from '~/utils/printNumerWithCommas';
import LineChart from '~/components/UI/Chart/LineChart';

const _ = require('lodash');

export default function MonthRevenuePerDayChart({ data }) {
  const chartOptions = {
    colors: ['#20c997'],
    labels: data ? _.keys(data.dailyReport) : [],
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${printNumberWithCommas(y)} VNĐ`;
          }
          return y;
        },
      },
    },
  };

  return (
    <LineChart
      series={[
        {
          name: 'Doanh thu',
          data: data ? _.values(_.mapValues(data.dailyReport, (dateRevenue) => dateRevenue.revenue)) : [],
        },
      ]}
      options={chartOptions}
    />
  );
}
