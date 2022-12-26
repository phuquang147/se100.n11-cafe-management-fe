import BarChart from '~/components/UI/Chart/BarChart';

const _ = require('lodash');

export default function MonthQuantityPerProductChart({ data }) {
  const filteredProduct = _.filter(data.products, (product) => product.quantity > 0);
  const filteredProductName = _.map(filteredProduct, (product) => product.name);
  const filteredProductQuantity = _.map(filteredProduct, (product) => product.quantity);

  const chartOptions = {
    colors: ['#ffa16c'],
    xaxis: {
      categories: filteredProductName,
    },
  };

  return (
    <BarChart
      series={[{ name: 'Số lượng', data: filteredProductQuantity }]}
      options={chartOptions}
      height={filteredProduct.length > 0 ? filteredProduct.length * 36 + 50 : 300}
    />
  );
}
