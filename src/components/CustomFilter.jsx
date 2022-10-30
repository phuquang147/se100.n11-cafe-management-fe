import { List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import Iconify from './Iconify';

const useStyles = makeStyles({
  listItemText: {
    '& .css-1f1oq5v-MuiTypography-root': {
      fontSize: '14px',
    },
  },
});

export default function CustomFilter({ options }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);
  const styles = useStyles();

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <List component="nav" aria-label="Device settings" sx={{ p: 0 }}>
        <ListItem
          button
          sx={{ borderRadius: '10px', width: '175px' }}
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="Filter"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
        >
          <ListItemText className={styles.listItemText}>{options[selectedIndex]}</ListItemText>
          <ListItemIcon children={<Iconify icon="fa:angle-down" width={12} height={12} sx={{ m: 'auto' }} />} />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
