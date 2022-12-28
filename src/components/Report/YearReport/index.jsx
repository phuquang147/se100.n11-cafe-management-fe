import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
// MUI
import { Box, CircularProgress, Stack, TextField, Typography } from '@mui/material';
// components
import YearQuantityChart from './YearQuantityChart';
import YearRevenueChart from './YearRevenueChart';
// services
import { getReportByYear } from '~/services/reportServices';

export default function YearReport() {
  const [year, setYear] = useState(dayjs());
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getReport = async (year) => {
    try {
      setLoading(true);
      console.log(year.$y);
      const { data, status } = await getReportByYear({ year: year.$y.toString() });
      console.log(data);
      if (status === 200) setData(data.report);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReport(year);
  }, [year]);

  const handleChangeYear = (newYear) => {
    setYear(newYear);
    getReport(newYear);
  };

  return (
    <Box maxWidth sx={{ padding: 0 }} padding={0}>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            views={['year']}
            label="Chọn năm"
            value={year}
            inputFormat="YYYY"
            onChange={(newYear) => {
              handleChangeYear(newYear);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Stack>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {data ? (
            <Stack rowGap={2}>
              <Box sx={{ overflowX: 'overlay', overflowY: 'hidden' }}>
                <Typography variant="h5">Số lượng các sản phẩm đã bán</Typography>
                <Box sx={{ minWidth: 600, pr: 1 }}>
                  <YearQuantityChart data={data} />
                </Box>
              </Box>
              <Box sx={{ overflowX: 'overlay', overflowY: 'hidden' }}>
                <Typography variant="h5">Doanh thu các sản phẩm đã bán</Typography>
                <Box sx={{ minWidth: 600, pr: 1 }}>
                  <YearRevenueChart data={data} />
                </Box>
              </Box>
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
