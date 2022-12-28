import { printNumberWithCommas } from '~/utils/printNumerWithCommas';
import BarChart from '~/components/UI/Chart/BarChart';

const _ = require('lodash');

export default function DayRevenueChart({ data }) {
  const filteredProduct = _.filter(data.products, (product) => product.quantity > 0);
  const filteredProductName = _.map(filteredProduct, (product) => product.name);
  const filteredProductRevenue = _.map(filteredProduct, (product) => product.totalPrice);

  const chartOptions = {
    colors: ['#20c997'],
    xaxis: {
      categories: filteredProductName,
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
      series={[{ name: 'Doanh thu', data: filteredProductRevenue }]}
      options={chartOptions}
      height={filteredProduct.length > 0 ? filteredProduct.length * 36 + 50 : 300}
    />
  );
}
