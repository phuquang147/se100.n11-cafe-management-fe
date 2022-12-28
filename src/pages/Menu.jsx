import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
// import useResponsive from '~/hooks/useResponsive';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// @mui
import { Box, Button, CircularProgress, Container, Grid, Stack, Tabs, TextField, Typography } from '@mui/material';
// components
import { MetaTags } from 'react-meta-tags';
import CategoryModal from '~/components/Menu/CategoryModal';
import CategoryTab from '~/components/Menu/CategoryTab';
import Product from '~/components/Menu/Product';
import Iconify from '~/components/UI/Iconify';
import useDebounce from '~/hooks/useDebounce';
import { selectCategories, selectProducts, setProducts } from '~/redux/dataSlice';
import { getProducts } from '~/services/productServices';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 4 }}>{children}</Box>}
    </div>
  );
}

export default function Menu() {
  // const isMobile = useResponsive('down', 'md');
  const [value, setValue] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [openNewCategoryModal, setOpenNewCategoryModal] = useState(false);
  const products = useSelector(selectProducts);
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();

  const [loadedProducts, setLoadedProducts] = useState(products);

  const loadProducts = useCallback(async () => {
    const data = await getProducts();
    setLoadedProducts(data.products);
    dispatch(setProducts(data.products));
  }, [dispatch]);

  useEffect(() => {
    loadProducts();
  }, [dispatch, loadProducts, categories]);

  const handleChange = useCallback(
    (event, newValue) => {
      setValue(newValue);
      switch (newValue) {
        case 0:
          const coffeeProducts = products.filter((product) => product.category.name === categories[0]?.name);
          setLoadedProducts(coffeeProducts);
          break;
        case 1:
          const teaProducts = products.filter((product) => product.category.name === categories[1]?.name);
          setLoadedProducts(teaProducts);
          break;
        case 2:
          const snackProducts = products.filter((product) => product.category.name === categories[2]?.name);
          setLoadedProducts(snackProducts);
          break;
        case 3:
          const otherProducts = products.filter((product) => product.category.name === categories[3]?.name);
          setLoadedProducts(otherProducts);
          break;
        default:
          break;
      }
    },
    [products, categories],
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

  const handleChangeTab = (newTab) => {
    setValue(newTab);
    handleChange(null, newTab);
  };

  const handleCloseNewCategoryModal = () => {
    setOpenNewCategoryModal(false);
  };

  if (loadedProducts.length === 0 && !searchValue) {
    return (
      <Box sx={{ textAlign: 'center' }}>
        <CircularProgress sx={{ mt: 10 }} />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl">
      <MetaTags>
        <title>Brother Coffee - Menu</title>
      </MetaTags>
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
        <Tabs value={value} sx={{ overflowX: 'auto' }} variant="scrollable" scrollButtons="auto">
          {categories.map((category, index) => (
            // <Tab key={index} label={category} />
            <CategoryTab
              key={index}
              label={category.name}
              value={index}
              category={category}
              handleChange={handleChangeTab}
            />
          ))}
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

      {[...Array(4)].map((_, index) => (
        <TabPanel key={index} value={value} index={index}>
          <Grid container spacing={3}>
            {loadedProducts.map((product, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} xl={3}>
                <Product data={product} onLoadProducts={loadProducts} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      ))}
      <CategoryModal type="new" isOpen={openNewCategoryModal} onCloseModal={handleCloseNewCategoryModal} />
    </Container>
  );
}
