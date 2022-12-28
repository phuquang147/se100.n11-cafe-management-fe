import { useEffect, useState } from 'react';
// @mui
import { Box, CircularProgress, Container, Grid, Typography } from '@mui/material';
// Components
import CategoryBestSellersChart from '~/components/Dashboard/CategoryBestSellersChart';
import ProductBestSellersChart from '~/components/Dashboard/ProductBestSellersChart';
import TotalProductSaleInDay from '~/components/Dashboard/TotalProductSaleInDay';
import TotalRevenueInDay from '~/components/Dashboard/TotalRevenueInDay';
import TotalStaff from '~/components/Dashboard/TotalStaff';
// services
import { getDashboardData } from '~/services/dashboardServices';
import { MetaTags } from 'react-meta-tags';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      setLoading(true);
      const { data, status } = await getDashboardData();
      if (status === 200) setData(data.report);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ pb: 4 }}>
      <MetaTags>
        <title>Brother Coffee - Dashboard</title>
      </MetaTags>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {data ? (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <TotalRevenueInDay revenue={data.totalRevenue} />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TotalProductSaleInDay quantity={data.totalSales} />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TotalStaff staff={data.numberOfStaff} />
              </Grid>

              <Grid item xs={12} md={6} lg={6}>
                <ProductBestSellersChart products={data.products} />
              </Grid>

              <Grid item xs={12} md={6} lg={6}>
                <CategoryBestSellersChart categories={data.categories} />
              </Grid>
            </Grid>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
              <Typography>Đã có lỗi xảy ra</Typography>
            </Box>
          )}
        </>
      )}
    </Container>
  );
}
