import { printNumberWithCommas } from '~/utils/printNumerWithCommas';
import DonutChart from '~/components/UI/Chart/DonutChart';

const _ = require('lodash');

export default function DayRevenueRateChart({ data }) {
  const filteredProduct = _.filter(data.products, (product) => product.quantity > 0);
  const categories = _.groupBy(filteredProduct, 'categoryName');
  const categoryNames = _.keys(categories);
  const groupedCategoryPrice = _.values(
    _.mapValues(categories, (categoryValue) => {
      const totalPrice = _.reduce(categoryValue, (sum, product) => sum + product.totalPrice, 0);
      return totalPrice;
    }),
  );

  const chartOptions = {
    labels: categoryNames,
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

  return <DonutChart options={chartOptions} series={groupedCategoryPrice} />;
}
