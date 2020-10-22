import { Box } from '@material-ui/core';
import Navbar from 'components/Navbar/Navbar';
import React from 'react';

const Layout = ({ children }) => {
  return (
    <Box>
      <Navbar />
      {children}
    </Box>
  );
};

export default Layout;
