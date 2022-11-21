import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
// @mui
import { Box, Button, CircularProgress, Container, Grid, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
// components
import Iconify from '~/components/UI/Iconify';
import Product from '~/components/Menu/Product';
import { useSelector } from 'react-redux';
import { selectProducts } from '~/redux/dataSlice';
import useDebounce from '~/hooks/useDebounce';
import { useEffect } from 'react';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 4 }}>{children}</Box>}
    </div>
  );
}

export default function Menu() {
  const [value, setValue] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const products = useSelector(selectProducts);

  const [loadedProducts, setLoadedProducts] = useState(products);

  const handleChange = useCallback(
    (event, newValue) => {
      setValue(newValue);
      switch (newValue) {
        case 0:
          const coffeeProducts = products.filter((product) => product.category.name === 'Cà phê');
          setLoadedProducts(coffeeProducts);
          break;
        case 1:
          const teaProducts = products.filter((product) => product.category.name === 'Trà');
          setLoadedProducts(teaProducts);
          break;
        case 2:
          const snackProducts = products.filter((product) => product.category.name === 'Đồ ăn vặt');
          setLoadedProducts(snackProducts);
          break;
        case 3:
          const otherProducts = products.filter((product) => product.category.name === 'Khác');
          setLoadedProducts(otherProducts);
          break;
        default:
          break;
      }
    },
    [products],
  );

  const debouncedValue = useDebounce(searchValue, 500);
  useEffect(() => {
    if (debouncedValue.trim().length === 0) {
      setLoadedProducts([]);
    }

    if (debouncedValue !== '') {
      const relevantProducts = products.filter((item) =>
        item.name.toLowerCase().includes(debouncedValue.toLowerCase()),
      );
      setLoadedProducts(relevantProducts);
    } else {
      handleChange(null, value);
    }
  }, [debouncedValue, products, value, handleChange]);

  const handleInputChange = (e) => {
    const searchInputValue = e.target.value;
    if (!searchInputValue.startsWith(' ')) {
      setSearchValue(searchInputValue);
    }
  };

  return (
    <Container maxWidth="xl">
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h4">Menu</Typography>

        <Button variant="contained" component={Link} to="/menu/new" startIcon={<Iconify icon="eva:plus-fill" />}>
          Thêm món
        </Button>
      </Stack>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        columnGap={2}
        rowGap={2}
        justifyContent="space-between"
        sx={{ borderColor: 'divider', display: 'flex' }}
      >
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Cà phê" />
          <Tab label="Trà" />
          <Tab label="Đồ ăn nhẹ" />
          <Tab label="Khác" />
        </Tabs>
        <TextField
          variant="outlined"
          value={searchValue}
          placeholder="Tìm kiếm"
          sx={{ flex: '1', maxWidth: { md: '300px' } }}
          onChange={handleInputChange}
        />
      </Stack>

      {loadedProducts.length === 0 && searchValue && (
        <Box sx={{ textAlign: 'center' }}>
          <Typography sx={{ mt: 10 }}>Không tìm thấy sản phẩm nào</Typography>
        </Box>
      )}

      {loadedProducts.length === 0 && !searchValue && (
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress sx={{ mt: 10 }} />
        </Box>
      )}
      {[...Array(4)].map((_, index) => (
        <TabPanel key={index} value={value} index={index}>
          <Grid container spacing={3}>
            {loadedProducts.map((product, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} xl={3}>
                <Product data={product} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      ))}
    </Container>
  );
}
