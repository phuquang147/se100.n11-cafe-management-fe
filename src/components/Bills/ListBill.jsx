import { Badge, Card, Stack, Typography } from '@mui/material';

export default function ListBill({ bills, onSelectBill }) {
  return (
    <Stack direction="column" spacing={'12px'} sx={{ maxHeight: '600px', overflow: 'scroll' }}>
      {bills.map((item, index) => (
        <Card key={index} sx={{ p: 2, cursor: 'pointer', minHeight: '94px' }} onClick={() => onSelectBill(item)}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="h5">Đơn #{item.order}</Typography>
              <Badge color={index % 2 === 0 ? 'primary' : 'success'} variant="dot" />
              <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                {item.status}
              </Typography>
            </Stack>
            <Typography variant="subtitle1">
              {item.products.reduce((acc, cur) => {
                return acc + cur.price * cur.quantity;
              }, 0)}{' '}
              VNĐ
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="body1">Bàn {item.table}</Typography>
              <Badge color="info" variant="dot" />
              <Typography>{item.guests} Khách</Typography>
            </Stack>
            <Typography>{new Date().toLocaleTimeString()}</Typography>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
}
