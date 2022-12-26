import BarChart from '~/components/UI/Chart/BarChart';
// material
import { Box, Card, CardHeader } from '@mui/material';

const _ = require('lodash');

export default function ProductBestSellersChart({ products }) {
  const filteredProducts = _.filter(products, (product) => product.quantity > 0);
  const productNames = _.map(filteredProducts, (product) => product.name);
  const productQuantity = _.map(filteredProducts, (product) => product.quantity);

  const chartOptions = {
    colors: ['#ffa16c'],
    xaxis: {
      categories: productNames,
    },
  };

  return (
    <Card>
      <CardHeader title="Top sản phẩm bán chạy" />
      <Box sx={{ px: 2 }}>
        <BarChart series={[{ name: 'Số lượng', data: productQuantity }]} options={chartOptions} />
      </Box>
    </Card>
  );
}
