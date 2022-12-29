import { useState } from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function ViewsDatePicker({ onFilter }) {
  const [value, setValue] = useState(dayjs(new Date()));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        views={['day', 'month', 'year']}
        openTo="day"
        label="Ngày"
        minDate={dayjs('2012-03-01')}
        maxDate={dayjs('2023-06-01')}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          onFilter(newValue);
        }}
        renderInput={(params) => <TextField {...params} helperText={null} />}
      />
    </LocalizationProvider>
  );
}
