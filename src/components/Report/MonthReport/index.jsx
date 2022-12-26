import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
// @mui
import { Box, CircularProgress, Divider, Grid, Stack, TextField, Typography } from '@mui/material';
// components
import CustomSelect from '~/components/UI/CustomSelect';
import MonthQuantityPerDayChart from './MonthQuantityPerDayChart';
import MonthQuantityPerProductChart from './MonthQuantityPerProductChart';
import MonthQuantityRateChart from './MonthQuantityRateChart';
import MonthRevenuePerDayChart from './MonthRevenuePerDayChart';
import MonthRevenuePerProductChart from './MonthRevenuePerProductChart';
import MonthRevenueRateChart from './MonthRevenueRateChart';
// services
import { getReportByMonth } from '~/services/reportServices';
// utils
import { printNumberWithCommas } from '~/utils/printNumerWithCommas';

const viewModes = ['Theo ngày', 'Theo sản phẩm', 'Theo danh mục'];

const renderChartByViewMode = (viewMode, data) => {
  switch (viewMode) {
    case 'Theo sản phẩm':
      return (
        <Grid container spacing={3} sx={{ pt: 1 }}>
          <Grid item xs={12} lg={6}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Số lượng các sản phẩm đã bán
            </Typography>
            <MonthQuantityPerProductChart data={data} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Doanh thu các sản phẩm đã bán
            </Typography>
            <MonthRevenuePerProductChart data={data} />
          </Grid>
        </Grid>
      );
    case 'Theo danh mục':
      return (
        <Grid container spacing={3} sx={{ pt: 1 }}>
          <Grid item xs={12} lg={6}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Số lượng các sản phẩm đã bán
            </Typography>
            <MonthQuantityRateChart data={data} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Doanh thu các sản phẩm đã bán
            </Typography>
            <MonthRevenueRateChart data={data} />
          </Grid>
        </Grid>
      );
    default:
      return (
        <Stack>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Số lượng các sản phẩm đã bán
          </Typography>
          <MonthQuantityPerDayChart data={data} />
          <Typography variant="h5" sx={{ mb: 2 }}>
            Doanh thu các sản phẩm đã bán
          </Typography>
          <MonthRevenuePerDayChart data={data} />
        </Stack>
      );
  }
};
export default function MonthReport() {
  const [month, setMonth] = useState(dayjs());
  const [viewMode, setViewMode] = useState(viewModes[0]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getReport = async () => {
    try {
      setLoading(true);
      const { data, status } = await getReportByMonth({ month: month.$M, year: month.$y });
      if (status === 200) setData(data.report);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReport();
  }, []);

  const handleChangeViewMode = (newViewMode) => {
    if (newViewMode !== viewMode) setViewMode(newViewMode);
  };

  const handleChangeMonth = (newMonth) => {
    setMonth(newMonth);
    getReport(newMonth);
  };

  return (
    <Box maxWidth sx={{ padding: 0 }} padding={0}>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            views={['year', 'month']}
            label="Chọn tháng"
            value={month}
            inputFormat="MM/YYYY"
            onChange={(newMonth) => {
              handleChangeMonth(newMonth);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <CustomSelect options={viewModes} onSelect={handleChangeViewMode} />
      </Stack>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {data && data.totalQuantity > 0 ? (
            <Stack>
              {renderChartByViewMode(viewMode, data)}
              <Grid container>
                <Grid item xs={12} lg={6}></Grid>
                <Grid item xs={12} lg={6}>
                  <Stack rowGap={1}>
                    <Divider />
                    <Typography variant="h5">Thống kê</Typography>
                    <Stack direction="row" columnGap={1}>
                      <Typography fontSize={16}>Tổng số sản phẩm đã bán:</Typography>
                      <Typography fontSize={16} fontWeight="bold" color="#ffa16c">
                        {data.totalQuantity}
                      </Typography>
                    </Stack>
                    <Stack direction="row" columnGap={1}>
                      <Typography fontSize={16}>Tổng doanh thu:</Typography>
                      <Typography fontSize={16} fontWeight="bold" color="#ffa16c">
                        {`${printNumberWithCommas(data.totalPrice)} VNĐ`}
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
              <Typography>Không có dữ liệu</Typography>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
