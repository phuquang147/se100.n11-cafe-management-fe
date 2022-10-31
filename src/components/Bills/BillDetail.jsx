import { faker } from '@faker-js/faker';
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

export default function BillDetail() {
  const theme = useTheme();

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Order #35
        </Typography>
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
          Active
        </Button>
      </Stack>
      <Divider />
      <Typography variant="h6" sx={{ mb: 2, mt: 3 }}>
        Details
      </Typography>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="subtitle1" color={theme.palette.grey[500]} sx={{ fontWeight: 'bold', mb: 1 }}>
            Table
          </Typography>
          <Typography variant="h6">2B</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="subtitle1" color={theme.palette.grey[500]} sx={{ fontWeight: 'bold', mb: 1 }}>
            Guests
          </Typography>
          <Typography variant="h6">2</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="subtitle1" color={theme.palette.grey[500]} sx={{ fontWeight: 'bold', mb: 1 }}>
            Customer
          </Typography>
          <Typography variant="h6">{faker.name.fullName()}</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="subtitle1" color={theme.palette.grey[500]} sx={{ fontWeight: 'bold', mb: 1 }}>
            Payment
          </Typography>
          <Typography variant="h6">By Cash</Typography>
        </Box>
      </Stack>
      <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>
        Order info
      </Typography>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="subtitle1" color={theme.palette.grey[500]} sx={{ fontWeight: 'bold', mb: 1 }}>
          Items
        </Typography>
        <Typography variant="subtitle1" color={theme.palette.grey[500]} sx={{ fontWeight: 'bold', mb: 1 }}>
          Price
        </Typography>
      </Stack>
      <Box sx={{ width: '100%' }}>
        <nav aria-label="main">
          <List>
            <ListItem disablePadding secondaryAction="$42">
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
            <ListItem disablePadding secondaryAction="$42">
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
            <ListItem disablePadding secondaryAction="$42">
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
                Total
              </Typography>
              <Typography variant="h6" sx={{ mb: 2, mt: 3 }}>
                $1000
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
                Charge customer $1000
              </Button>
            </Box>
          </List>
        </nav>
      </Box>
    </Box>
  );
}
