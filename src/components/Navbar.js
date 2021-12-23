import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className='nav-container'>
      <div className='nav-title'>Travel Map</div>
      <div>
        <IconButton
          color='primary'
          aria-label='account of current user'
          aria-controls='menu-appbar'
          aria-haspopup='true'
          onClick={() => setMenuOpen(true)}
          color='inherit'
        >
          <AccountCircle style={{ color: 'white' }} fontSize='large' />
        </IconButton>
        <Menu
          id='menu-appbar'
          // anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
        >
          <MenuItem onClick={() => setMenuOpen(false)}>Profile</MenuItem>
          <MenuItem onClick={() => setMenuOpen(false)}>My account</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
