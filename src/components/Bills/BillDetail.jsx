import { faker } from '@faker-js/faker';
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router';
import Iconify from '../Iconify';

export default function BillDetail() {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('/bills/edit/35');
  };

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Stack direction="row" alignItems="center">
          <Typography variant="h4" sx={{ fontWeight: 'bold', mr: 2 }}>
            Đơn #35
          </Typography>
          <IconButton size="small" color="primary" onClick={handleEdit}>
            <Iconify icon="ic:baseline-mode-edit" width={24} height={24} />
          </IconButton>
          <IconButton size="small" color="primary">
            <Iconify icon="bxs:trash-alt" width={24} height={24} />
          </IconButton>
        </Stack>
        <Button
          sx={{
            backgroundColor: theme.palette.primary.main,
            '&:hover': { backgroundColor: theme.palette.primary.dark },
            color: 'black',
            width: '160px',
            height: '40px',
            cursor: 'default',
          }}
        >
          Đang uống
        </Button>
      </Stack>
      <Divider />
      <Typography variant="h6" sx={{ mb: 2, mt: 3 }}>
        Chi tiết
      </Typography>
      <Stack direction="row" alignItems="center" spacing={10}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="subtitle1" color={theme.palette.grey[500]} sx={{ fontWeight: 'bold', mb: 1 }}>
            Bàn
          </Typography>
          <Typography variant="h6">2B</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="subtitle1" color={theme.palette.grey[500]} sx={{ fontWeight: 'bold', mb: 1 }}>
            Khách
          </Typography>
          <Typography variant="h6">2</Typography>
        </Box>
      </Stack>
      <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>
        Thông tin hóa đơn
      </Typography>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="subtitle1" color={theme.palette.grey[500]} sx={{ fontWeight: 'bold', mb: 1 }}>
          Sản phẩm
        </Typography>
        <Typography variant="subtitle1" color={theme.palette.grey[500]} sx={{ fontWeight: 'bold', mb: 1 }}>
          Giá
        </Typography>
      </Stack>
      <Box sx={{ width: '100%' }}>
        <nav aria-label="main">
          <List>
            <ListItem disablePadding secondaryAction="24,000 VNĐ">
              <ListItemButton>
                <ListItemIcon>
                  <img
                    src="https://product.hstatic.net/1000075078/product/1653291204_hi-tea-vai_0e8376fb3eec4127ba33aa47b8d2c723_large.jpg"
                    alt="product-img"
                    style={{ width: '50px', height: '50px', borderRadius: '10px' }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {faker.name.fullName()} x 2
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding secondaryAction="24,000 VNĐ">
              <ListItemButton>
                <ListItemIcon>
                  <img
                    src="https://product.hstatic.net/1000075078/product/1653291204_hi-tea-vai_0e8376fb3eec4127ba33aa47b8d2c723_large.jpg"
                    alt="product-img"
                    style={{ width: '50px', height: '50px', borderRadius: '10px' }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {faker.name.fullName()} x 2
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding secondaryAction="24,000 VNĐ">
              <ListItemButton>
                <ListItemIcon>
                  <img
                    src="https://product.hstatic.net/1000075078/product/1653291204_hi-tea-vai_0e8376fb3eec4127ba33aa47b8d2c723_large.jpg"
                    alt="product-img"
                    style={{ width: '50px', height: '50px', borderRadius: '10px' }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {faker.name.fullName()} x 2
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
            <Divider />
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h6" sx={{ mb: 2, mt: 3 }}>
                Tổng
              </Typography>
              <Typography variant="h6" sx={{ mb: 2, mt: 3 }}>
                200,000 VNĐ
              </Typography>
            </Stack>
            <Box sx={{ px: 3 }}>
              <Button
                fullWidth
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: 'white',
                  '&:hover': { backgroundColor: theme.palette.primary.dark },
                  height: '45px',
                  fontWeight: 'bold',
                  fontSize: '16px',
                }}
              >
                Thanh toán
              </Button>
            </Box>
          </List>
        </nav>
      </Box>
    </Box>
  );
}
