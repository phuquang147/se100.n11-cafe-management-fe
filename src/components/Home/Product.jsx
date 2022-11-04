// material
import { Button, Card, Grid, Stack, Typography } from '@mui/material';

export default function Product() {
  return (
    <Card sx={{ padding: 1 }}>
      <Stack rowGap={2}>
        <Grid container columnSpacing={2}>
          <Grid item xs={4}>
            <img
              src="https://product.hstatic.net/1000075078/product/1653291204_hi-tea-vai_0e8376fb3eec4127ba33aa47b8d2c723_large.jpg"
              alt="product-img"
              style={{ borderRadius: '10px', maxWidth: '100%' }}
              draggable={false}
            />
          </Grid>
          <Grid item xs={8}>
            <Stack>
              <Typography variant="h6">Hi-Tea Vải</Typography>
              <Typography variant="body2" color="primary" sx={{ fontWeight: '700' }}>
                50.000 VNĐ
              </Typography>
              <Typography sx={{ fontSize: '14px' }}>Lorem ipsum dolor sit amet consectetur adipisicing eli</Typography>
            </Stack>
          </Grid>
        </Grid>

        <Button variant="outlined" fullWidth sx={{ py: '6px', borderRadius: '10px' }}>
          Thêm món
        </Button>
      </Stack>
    </Card>
  );
}
