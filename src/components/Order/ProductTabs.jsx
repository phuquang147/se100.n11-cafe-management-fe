import { faker } from '@faker-js/faker';
import { Box, Grid, Tab, Tabs, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Product from '~/components/Home/Product';
import useDebounce from '~/hooks/useDebounce';

const useStyles = makeStyles({
  textField: {
    '& .css-1u3bzj6-MuiFormControl-root-MuiTextField-root': {
      width: '100%',
    },
  },
});

const coffeeProducts = [
  {
    id: faker.datatype.uuid(),
    img: 'https://product.hstatic.net/1000075078/product/1653291204_hi-tea-vai_0e8376fb3eec4127ba33aa47b8d2c723_large.jpg',
    name: faker.name.fullName(),
    price: faker.datatype.number({ min: 20000, max: 100000, precision: 1000 }),
  },
  {
    id: faker.datatype.uuid(),
    img: 'https://product.hstatic.net/1000075078/product/1653291204_hi-tea-vai_0e8376fb3eec4127ba33aa47b8d2c723_large.jpg',
    name: faker.name.fullName(),
    price: faker.datatype.number({ min: 20000, max: 100000, precision: 1000 }),
  },
  {
    id: faker.datatype.uuid(),
    img: 'https://product.hstatic.net/1000075078/product/1653291204_hi-tea-vai_0e8376fb3eec4127ba33aa47b8d2c723_large.jpg',
    name: faker.name.fullName(),
    price: faker.datatype.number({ min: 20000, max: 100000, precision: 1000 }),
  },
];

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
  const [coffee, setCoffee] = useState(coffeeProducts);
  const [searchValue, setSearchValue] = useState('');
  const styles = useStyles();

  const debouncedValue = useDebounce(searchValue, 500);
  useEffect(() => {
    if (debouncedValue.trim().length === 0) {
      setCoffee([]);
    }

    const relevantProducts = coffeeProducts.filter((item) =>
      item.name.toLowerCase().includes(debouncedValue.toLowerCase()),
    );
    setCoffee(relevantProducts);
  }, [debouncedValue]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Cà phê" />
            <Tab label="Đồ ăn nhẹ" />
          </Tabs>
        </Grid>
        <Grid item xs={12} md={6} className={styles.textField}>
          <TextField variant="outlined" placeholder="Tìm kiếm" value={searchValue} onChange={handleInputChange} />
        </Grid>
      </Grid>
      <TabPanel value={value} index={0}>
        <Grid container spacing={2}>
          {coffee.map((item, index) => (
            <Grid key={index} item xs={6} md={4}>
              <Product product={item} onSelect={onSelect} />
            </Grid>
          ))}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container spacing={2}>
          {coffee.map((item, index) => (
            <Grid key={index} item xs={6} md={4}>
              <Product product={item} onSelect={onSelect} />
            </Grid>
          ))}
        </Grid>
      </TabPanel>
    </>
  );
}
