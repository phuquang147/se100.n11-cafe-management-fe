import ReactApexChart from 'react-apexcharts';

export default function DonutChart({ series, options }) {
  return <ReactApexChart options={options} series={series} type="donut" height={360} />;
}
