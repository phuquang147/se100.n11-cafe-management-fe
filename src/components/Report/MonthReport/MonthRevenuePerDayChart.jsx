import { printNumberWithCommas } from '~/utils/printNumerWithCommas';
import LineChart from '~/components/UI/Chart/LineChart';

const _ = require('lodash');

export default function MonthRevenuePerDayChart({ data }) {
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
    colors: ['#20c997'],
    labels: data ? _.keys(data.dateRevenues) : [],
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
          data: data ? _.values(_.mapValues(data.dateRevenues, (dateRevenue) => dateRevenue.totalPrice)) : [],
        },
      ]}
      options={chartOptions}
    />
  );
}
