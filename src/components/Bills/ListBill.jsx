import { Badge, Card, Stack, Typography } from '@mui/material';

export default function ListBill(props) {
  return (
    <Stack direction="column" spacing={'12px'} sx={{ maxHeight: '600px', overflow: 'scroll' }}>
      {[...Array(10)].map((item, index) => (
        <Card key={index} sx={{ p: 2, cursor: 'pointer', minHeight: '94px' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="h5">Đơn #35</Typography>
              <Badge color={index % 2 === 0 ? 'primary' : 'success'} variant="dot" />
              <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                {index % 2 === 0 ? 'Đang uống' : 'Đã thanh toán'}
              </Typography>
            </Stack>
            <Typography variant="subtitle1">24,000 VNĐ</Typography>
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="body1">Bàn 2B</Typography>
              <Badge color="info" variant="dot" />
              <Typography>2 Khách</Typography>
            </Stack>
            <Typography>{new Date().toLocaleTimeString()}</Typography>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
}
