import Typography from '@material-ui/core/Typography';
import { Box, Link } from '@material-ui/core';
import React from 'react';

const Footer = () => {
  return (
    <Box my={5}>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://github.com/matheusgoc/">
          Matheus Câmara
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  )
}

export default Footer