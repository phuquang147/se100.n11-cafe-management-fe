import DonutChart from '~/components/UI/Chart/DonutChart';

const _ = require('lodash');

export default function MonthQuantityRateChart({ data }) {
  const filteredProduct = _.filter(data.products, (product) => product.quantity > 0);
  const categories = _.groupBy(filteredProduct, 'categoryName');
  const categoryNames = _.keys(categories);
  const groupedCategoryQuantity = _.values(
    _.mapValues(categories, (categoryValue) => {
      const totalQuantity = _.reduce(categoryValue, (sum, product) => sum + product.quantity, 0);
      return totalQuantity;
    }),
  );

  const chartOptions = {
    labels: categoryNames,
  };

  return <DonutChart options={chartOptions} series={groupedCategoryQuantity} />;
}
