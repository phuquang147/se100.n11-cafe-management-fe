// material
import { Button, Card, Grid, Stack, Typography, IconButton, useTheme, Paper, Box } from '@mui/material';
// components
import Iconify from '../UI/Iconify';

export default function ProductCart() {
  const theme = useTheme();

  return (
    <Paper sx={{ padding: 1 }}>
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
            <Stack height="100%" justifyContent="space-between">
              <Box>
                <Typography variant="h6">Hi-Tea Vải</Typography>
                <Typography color="primary" sx={{ fontSize: '12px', fontWeight: '700' }}>
                  50.000 VNĐ
                </Typography>
              </Box>
              <Grid container>
                <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography color="primary" sx={{ fontSize: '14px', fontWeight: '900' }}>
                    50.000 VNĐ
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <IconButton size="small" sx={{ border: '1px solid #ccc' }}>
                    <Iconify icon="akar-icons:minus" width={24} height={24} color={theme.palette.grey[500]} />
                  </IconButton>
                  <Typography sx={{ display: 'inline', fontSize: '16px', fontWeight: '700' }}>1</Typography>
                  <IconButton size="small" color="primary" sx={{ border: '1px solid #ffa16c' }}>
                    <Iconify icon="akar-icons:plus" width={24} height={24} />
                  </IconButton>
                </Grid>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Paper>
  );
}
