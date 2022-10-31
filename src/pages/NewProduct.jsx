// material
import { Card, Container, Stack, Typography } from '@mui/material';
import ProductForm from '~/components/Menu/ProductForm';
// components

export default function NewProduct() {
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Thêm món
        </Typography>
      </Stack>

      <Card sx={{ padding: 4 }}>
        <ProductForm />
      </Card>
    </Container>
  );
}
