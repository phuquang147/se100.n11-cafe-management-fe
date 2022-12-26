import LineChart from '~/components/UI/Chart/LineChart';

const _ = require('lodash');

export default function YearQuantityChart({ data }) {
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
    colors: ['#ffa16c'],
  };

  return (
    <LineChart
      series={[
        {
          name: 'Số lượng',
          data: _.values(_.mapValues(data.monthRevenues, (monthRevenue) => monthRevenue.totalQuantity)),
        },
      ]}
      options={chartOptions}
    />
  );
}
