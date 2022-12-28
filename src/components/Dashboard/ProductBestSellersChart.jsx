import BarChart from '~/components/UI/Chart/BarChart';
// material
import { Box, Card, CardHeader } from '@mui/material';

const _ = require('lodash');

export default function ProductBestSellersChart({ products }) {
  const productNames = _.map(products, (product) => product.name);
  const productQuantity = _.map(products, (product) => product.sales);

  const chartOptions = {
    colors: ['#ffa16c'],
    xaxis: {
      categories: productNames,
    },
  };

  return (
    <Card>
      <CardHeader title="Top sản phẩm bán chạy" sx={{ mb: 2 }} />
      <Box sx={{ maxHeight: 360, overflow: 'overlay', pr: 1 }}>
        <BarChart
          series={[{ name: 'Số lượng', data: productQuantity }]}
          options={chartOptions}
          height={products.length > 0 ? products.length * 36 + 50 : 300}
        />
      </Box>
    </Card>
  );
}
