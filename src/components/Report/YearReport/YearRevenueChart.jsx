import { printNumberWithCommas } from '~/utils/printNumerWithCommas';
import LineChart from '~/components/UI/Chart/LineChart';

const _ = require('lodash');

export default function YearRevenueChart({ data }) {
  const chartOptions = {
    labels: _.keys(data.monthlyReport),
    colors: ['#20c997'],
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
          name: 'Số lượng',
          data: _.values(_.mapValues(data.monthlyReport, (monthRevenue) => monthRevenue.revenue)),
        },
      ]}
      options={chartOptions}
    />
  );
}
