// material
import { Button, Card, Grid, Stack, Typography, IconButton, useTheme } from '@mui/material';
// components
import Iconify from '../Iconify';

export default function Product() {
  const theme = useTheme();

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

        <Grid container columnSpacing={2}>
          <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <IconButton size="small" sx={{ border: '1px solid #ccc' }}>
              <Iconify icon="akar-icons:minus" width={24} height={24} color={theme.palette.grey[500]} />
            </IconButton>
            <Typography sx={{ display: 'inline', fontSize: '16px', fontWeight: '700' }}>1</Typography>
            <IconButton size="small" color="primary" sx={{ border: '1px solid #ffa16c' }}>
              <Iconify icon="akar-icons:plus" width={24} height={24} />
            </IconButton>
          </Grid>
          <Grid item xs={8}>
            <Button variant="outlined" fullWidth sx={{ py: '6px', borderRadius: '10px' }}>
              Thêm vào giỏ
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Card>
  );
}
