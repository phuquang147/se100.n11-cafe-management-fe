import BarChart from '~/components/UI/Chart/BarChart';

const _ = require('lodash');

export default function MonthQuantityPerProductChart({ data }) {
  const productName = _.map(data.products, (product) => product.name);
  const productQuantity = _.map(data.products, (product) => product.sales);

  const chartOptions = {
    colors: ['#ffa16c'],
    xaxis: {
      categories: productName,
    },
  };

  return (
    <BarChart
      series={[{ name: 'Số lượng', data: productQuantity }]}
      options={chartOptions}
      height={data.products.length > 0 ? data.products.length * 36 + 50 : 300}
    />
  );
}
