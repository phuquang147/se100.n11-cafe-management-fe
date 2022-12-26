import ReactApexChart from 'react-apexcharts';

const _ = require('lodash');

export default function LineChart({ series, options }) {
  const chartOptions = {
    chart: {
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
  };
  return <ReactApexChart type="line" series={series} options={_.merge(chartOptions, options)} height={360} />;
}
