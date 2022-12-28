import LineChart from '~/components/UI/Chart/LineChart';

const _ = require('lodash');

export default function MonthQuantityPerDayChart({ data }) {
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
    labels: _.keys(data.dateRevenues),
    colors: ['#ffa16c'],
  };

  return (
    <LineChart
      series={[
        {
          name: 'Số lượng',
          data: _.values(_.mapValues(data.dateRevenues, (dateRevenue) => dateRevenue.totalQuantity)),
        },
      ]}
      options={chartOptions}
    />
  );
}
