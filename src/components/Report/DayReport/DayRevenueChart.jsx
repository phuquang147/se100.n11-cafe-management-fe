import { printNumberWithCommas } from '~/utils/printNumerWithCommas';
import BarChart from '~/components/UI/Chart/BarChart';

const _ = require('lodash');

export default function DayRevenueChart({ data }) {
  const productName = _.map(data.products, (product) => product.name);
  const productRevenue = _.map(data.products, (product) => product.revenue);

  const chartOptions = {
    colors: ['#20c997'],
    xaxis: {
      categories: productName,
    },
    tooltip: {
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${printNumberWithCommas(y)} VNĐ`;
          }
          return y;
        },
      },
    },
    dataLabels: {
      formatter: function (val, opt) {
        return printNumberWithCommas(val) + ' VNĐ';
      },
    },
  };

  return (
    <BarChart
      series={[{ name: 'Doanh thu', data: productRevenue }]}
      options={chartOptions}
      height={data.products.length > 0 ? data.products.length * 36 + 50 : 300}
    />
  );
}
