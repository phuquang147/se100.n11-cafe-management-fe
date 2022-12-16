// material
import { faker } from '@faker-js/faker';
import { Box, Button, Card, Grid, Stack, Typography } from '@mui/material';
import { printNumberWithCommas } from '~/utils/printNumerWithCommas';

export default function Product({ product, onSelect }) {
  // let loadedProduct = product;
  // if (!loadedProduct) {
  //   loadedProduct = {
  //     id: faker.datatype.uuid(),
  //     img: 'https://product.hstatic.net/1000075078/product/1653291204_hi-tea-vai_0e8376fb3eec4127ba33aa47b8d2c723_large.jpg',
  //     name: faker.name.fullName(),
  //     price: faker.datatype.number({ min: 20000, max: 100000, precision: 1000 }),
  //   };
  // }

  return (
    <Card>
      <Stack rowGap={2}>
        <Grid container rowSpacing={1}>
          <Grid item xs={12}>
            <img
              src={`http://localhost:3001/${product.image}`}
              alt={product.name}
              style={{ borderRadius: '10px', maxWidth: '100%' }}
              draggable={false}
              crossOrigin="anonymous"
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ p: 1 }}>
              <Typography variant="h6" sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {product.name}
              </Typography>
              <Typography variant="body2" color="primary" sx={{ fontWeight: '700' }}>
                {printNumberWithCommas(product.price)} VNĐ
              </Typography>
              <Button
                variant="outlined"
                fullWidth
                sx={{ px: '6px', mt: 1, borderRadius: '10px' }}
                onClick={() =>
                  onSelect({
                    ...product,
                    quantity: 1,
                  })
                }
              >
                Thêm món
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </Card>
  );
}
