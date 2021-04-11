import React from 'react'
import { Box, Typography } from '@material-ui/core'

const NotFound = () => {
  return (
    <Box height="100vh"
         display="flex"
         flexDirection="column"
         justifyContent="center"
         alignItems="center"
         color="error.dark">
      <Typography variant={'h2'}>Oops, sorry!</Typography>
      <Typography variant={'subtitle1'}>This page does not exist!</Typography>
    </Box>
  )
}

export default NotFound