import { Badge, Card, Stack, Typography } from '@mui/material';
import { printNumberWithCommas } from '~/utils/printNumerWithCommas';

export default function ListBill({ bills, onSelectBill }) {
  return (
    <Stack direction="column" spacing={'12px'} sx={{ maxHeight: '600px', overflowY: 'auto', p: '2px' }}>
      {bills.map((item, index) => (
        <Card key={index} sx={{ p: 2, cursor: 'pointer', minHeight: '94px' }} onClick={() => onSelectBill(item)}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="h5">Đơn #{item._id.slice(0, 6).toUpperCase()}</Typography>
              <Badge
                color={
                  item.state === 'Đã thanh toán' ? 'success' : item.state === 'Chưa thanh toán' ? 'primary' : 'error'
                }
                variant="dot"
              />
              <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                {item.state}
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="subtitle1">{item.tables.length} bàn</Typography>
              <Badge color="secondary" variant="dot" />
              <Typography variant="subtitle1">{printNumberWithCommas(item.totalPrice)} VNĐ</Typography>
            </Stack>
            <Typography>{new Date(item.createdAt).toLocaleDateString()}</Typography>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
}
