// material
import { Badge, Button, Divider, Drawer, IconButton, Stack, Typography, useTheme } from '@mui/material';
// components
import Iconify from '~/components/UI/Iconify';
import Scrollbar from '~/components/UI/Scrollbar';
import ProductCart from './ProductCart';

export default function CartSidebar({ isOpenFilter, onOpenFilter, onCloseFilter }) {
  const theme = useTheme();
  return (
    <>
      <Button color="inherit" onClick={onOpenFilter}>
        <Badge badgeContent={4} color="primary">
          Giỏ hàng
          <Iconify
            icon="clarity:shopping-cart-line"
            width={24}
            height={24}
            color={theme.palette.grey[500]}
            sx={{ ml: 1 }}
          />
        </Badge>
      </Button>

      <Drawer
        anchor="right"
        open={isOpenFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 400, maxWidth: '100%', border: 'none', overflow: 'hidden', display: 'flex' },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="h6" sx={{ ml: 1 }}>
            Giỏ hàng
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" width={20} height={20} />
          </IconButton>
        </Stack>

        <Divider />
        <Scrollbar>
          <Stack sx={{ p: 2 }} rowGap={1}>
            <ProductCart />
            <Divider />
            <ProductCart />
            <Divider />
            <ProductCart />
            <Divider />
            <ProductCart />
            <Divider />
            <ProductCart />
          </Stack>
        </Scrollbar>
        <Divider />
        <Stack sx={{ p: 2 }}>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="h6">Tổng tiền</Typography>
            <Typography color="primary" sx={{ fontSize: '18px', fontWeight: '900' }}>
              50.000 VNĐ
            </Typography>
          </Stack>
          <Button variant="contained" fullWidth sx={{ py: '6px', borderRadius: '10px' }}>
            Đặt món
          </Button>
        </Stack>
      </Drawer>
    </>
  );
}
