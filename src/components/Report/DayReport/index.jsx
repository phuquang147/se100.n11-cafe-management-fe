import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
// MUI
import { Box, CircularProgress, Divider, Grid, Stack, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// components
import CustomSelect from '~/components/UI/CustomSelect';
import DayQuantityChart from './DayQuantityChart';
import DayQuantityRateChart from './DayQuantityRateChart';
import DayRevenueChart from './DayRevenueChart';
import DayRevenueRateChart from './DayRevenueRateChart';
// services
import { getReportByDay } from '~/services/reportServices';
// utils
import { printNumberWithCommas } from '~/utils/printNumerWithCommas';

const viewModes = ['Theo sản phẩm', 'Theo danh mục'];

export default function DayReport() {
  const [day, setDay] = useState(dayjs());
  const [viewMode, setViewMode] = useState(viewModes[0]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getReport = async (day) => {
    try {
      setLoading(true);
      const { data, status } = await getReportByDay({ day: day.$D, month: day.$M, year: day.$y });
      if (status === 200) setData(data.report);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReport(day);
  }, []);

  const handleChangeViewMode = (newViewMode) => {
    if (newViewMode !== viewMode) setViewMode(newViewMode);
  };

  const handleChangeDay = (newDay) => {
    setDay(newDay);
    getReport(newDay);
  };

  console.log(data);
  return (
    <Box maxWidth sx={{ padding: 0 }} padding={0}>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Chọn ngày"
            value={day}
            inputFormat="DD/MM/YYYY"
            onChange={(newDay) => {
              handleChangeDay(newDay);
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
          {data && data.totalSales > 0 ? (
            <Grid container spacing={3}>
              <Grid item xs={12} lg={6}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Số lượng các sản phẩm đã bán
                </Typography>
                {viewMode === 'Theo sản phẩm' ? (
                  <Box height={360} sx={{ overflow: 'overlay', pr: 1 }}>
                    <Box minWidth={500}>
                      <DayQuantityChart data={data} />
                    </Box>
                  </Box>
                ) : (
                  <DayQuantityRateChart data={data} />
                )}
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Doanh thu các sản phẩm đã bán
                </Typography>
                {viewMode === 'Theo sản phẩm' ? (
                  <Box height={360} sx={{ overflow: 'overlay', pr: 1 }}>
                    <Box minWidth={500}>
                      <DayRevenueChart data={data} />
                    </Box>
                  </Box>
                ) : (
                  <DayRevenueRateChart data={data} />
                )}
              </Grid>
              <Grid item xs={12} lg={6}></Grid>
              <Grid item xs={12} lg={6}>
                <Stack rowGap={1}>
                  <Divider />
                  <Typography variant="h5">Thống kê</Typography>
                  <Stack direction="row" columnGap={1}>
                    <Typography fontSize={16}>Tổng số sản phẩm đã bán:</Typography>
                    <Typography fontSize={16} fontWeight="bold" color="#ffa16c">
                      {data.totalSales}
                    </Typography>
                  </Stack>
                  <Stack direction="row" columnGap={1}>
                    <Typography fontSize={16}>Tổng doanh thu:</Typography>
                    <Typography fontSize={16} fontWeight="bold" color="#ffa16c">
                      {`${data ? printNumberWithCommas(data.totalRevenue) : 0} VNĐ`}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
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
