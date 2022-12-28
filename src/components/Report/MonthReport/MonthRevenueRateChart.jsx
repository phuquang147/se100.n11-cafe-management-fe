import { printNumberWithCommas } from '~/utils/printNumerWithCommas';
import DonutChart from '~/components/UI/Chart/DonutChart';

const _ = require('lodash');

export default function MonthRevenueRateChart({ data }) {
  const categories = _.groupBy(data.products, 'category');
  const categoryNames = _.keys(categories);
  const groupedCategoryPrice = _.values(
    _.mapValues(categories, (categoryValue) => {
      const totalPrice = _.reduce(categoryValue, (sum, product) => sum + product.revenue, 0);
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
