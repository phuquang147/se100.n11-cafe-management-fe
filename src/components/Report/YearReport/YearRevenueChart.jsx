import { printNumberWithCommas } from '~/utils/printNumerWithCommas';
import LineChart from '~/components/UI/Chart/LineChart';

const _ = require('lodash');

export default function YearRevenueChart({ data }) {
  const chartOptions = {
    // chart: {
    //   events: {
    //     click: function (event, chartContext, config) {
    //       console.log(config.config.series[config.seriesIndex]);
    //       console.log(config.config.series[config.seriesIndex].name);
    //       console.log(config.config.series[config.seriesIndex].data[config.dataPointIndex]);
    //     },
    //   },
    // },
    labels: _.map(_.keys(data.monthRevenues), (key) => Number(key) + 1),
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
          data: _.values(_.mapValues(data.monthRevenues, (monthRevenue) => monthRevenue.totalPrice)),
        },
      ]}
      options={chartOptions}
    />
  );
}
