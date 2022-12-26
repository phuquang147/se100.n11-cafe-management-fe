// material
import { Card, CardHeader } from '@mui/material';
// components
import DonutChart from '../UI/Chart/DonutChart';

const _ = require('lodash');

export default function CategoryBestSellersChart({ categories }) {
  const categoryNames = _.map(categories, (category) => category.name);
  const categoryQuantity = _.map(categories, (category) => category.quantity);

  const chartOptions = {
    labels: categoryNames,
  };

  return (
    <Card>
      <CardHeader title="Top danh mục bán chạy" sx={{ mb: 2 }} />
      <DonutChart series={categoryQuantity} options={chartOptions} />
    </Card>
  );
}
