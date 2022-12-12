import { Box, Grid, Tab, Tabs, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Product from '~/components/Home/Product';
import useDebounce from '~/hooks/useDebounce';
import { selectCategories, selectProducts } from '~/redux/dataSlice';

const useStyles = makeStyles({
  textField: {
    '& .css-1u3bzj6-MuiFormControl-root-MuiTextField-root': {
      width: '100%',
    },
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 4 }}>{children}</Box>}
    </div>
  );
}

export default function ProductTabs({ onSelect }) {
  const [value, setValue] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const categories = useSelector(selectCategories);
  const products = useSelector(selectProducts);
  const styles = useStyles();
  const [loadedProducts, setLoadedProducts] = useState(products);

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

  const handleChangeTab = (newTab) => {
    setValue(newTab);
    handleChange(null, newTab);
  };

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
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Tabs value={value} aria-label="basic tabs example" variant="scrollable">
            {categories.map((category, index) => (
              <Tab label={category.name} key={index} onClick={() => handleChangeTab(index)} />
            ))}
          </Tabs>
        </Grid>
        <Grid item xs={12} md={6} className={styles.textField}>
          <TextField variant="outlined" placeholder="Tìm kiếm" value={searchValue} onChange={handleInputChange} />
        </Grid>
      </Grid>
      {[...Array(categories.length)].map((_, index) => (
        <TabPanel value={value} index={index} key={index}>
          <Grid container spacing={2}>
            {loadedProducts.map((item, index) => (
              <Grid key={index} item xs={6} md={4}>
                <Product product={item} onSelect={onSelect} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      ))}
    </>
  );
}
