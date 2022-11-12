import { IconButton, Stack, Typography, useTheme, Card } from '@mui/material';
import Iconify from '~/components/UI/Iconify';
import { printNumberWithCommas } from '~/utils/printNumerWithCommas';

export default function ProductItem({ item, onChangeQuantity, onDelete }) {
  const theme = useTheme();
  return (
    <Card sx={{ p: 1 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center" spacing={2}>
          <img src={item.img} alt={item.name} style={{ width: '60px', height: '60px', borderRadius: '10px' }} />
          <Stack direction="column" spacing="6px">
            <Typography variant="h6">{item.name}</Typography>
            <Typography variant="subtitle2">{printNumberWithCommas(item.price)} VNĐ</Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
              <IconButton
                size="small"
                color="primary"
                sx={{ border: '1px solid #ffa16c' }}
                onClick={() => {
                  onChangeQuantity('decrease');
                }}
              >
                <Iconify icon="akar-icons:minus" width={12} height={12} color="#ffa16c" />
              </IconButton>
              <Typography sx={{ display: 'inline', fontSize: '16px', fontWeight: '700' }}>{item.quantity}</Typography>
              <IconButton
                size="small"
                color="primary"
                sx={{ border: '1px solid #ffa16c' }}
                onClick={() => {
                  onChangeQuantity('increase');
                }}
              >
                <Iconify icon="akar-icons:plus" width={12} height={12} color="#ffa16c" />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
        <IconButton onClick={onDelete}>
          <Iconify icon="bxs:trash-alt" sx={{ width: '20px', height: '20px', color: theme.palette.primary.main }} />
        </IconButton>
      </Stack>
    </Card>
  );
}
