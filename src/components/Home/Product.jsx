// material
import { faker } from '@faker-js/faker';
import { Box, Button, Card, Grid, Stack, Typography } from '@mui/material';

export default function Product({ onSelect }) {
  return (
    <Card>
      <Stack rowGap={2}>
        <Grid container rowSpacing={1}>
          <Grid item xs={12}>
            <img
              src="https://product.hstatic.net/1000075078/product/1653291204_hi-tea-vai_0e8376fb3eec4127ba33aa47b8d2c723_large.jpg"
              alt="product-img"
              style={{ borderRadius: '10px', maxWidth: '100%' }}
              draggable={false}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ p: 1 }}>
              <Typography variant="h6">Hi-Tea Vải</Typography>
              <Typography variant="body2" color="primary" sx={{ fontWeight: '700' }}>
                50.000 VNĐ
              </Typography>
              <Button
                variant="outlined"
                fullWidth
                sx={{ px: '6px', mt: 1, borderRadius: '10px' }}
                onClick={() =>
                  onSelect({
                    img: 'https://product.hstatic.net/1000075078/product/1653291204_hi-tea-vai_0e8376fb3eec4127ba33aa47b8d2c723_large.jpg',
                    name: 'Hi-Tea Vải',
                    price: faker.datatype.number({ min: 20000, max: 100000, precision: 1000 }),
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
