import React from 'react'
import { Box, Typography } from '@material-ui/core'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const NotFound = () => {
  return (
    <>
      <Header />
      <Box height="80vh"
           display="flex"
           flexDirection="column"
           justifyContent="center"
           alignItems="center"
           color="error.dark">
        <Typography variant={'h2'}>Oops, sorry!</Typography>
        <Typography variant={'subtitle1'}>This page does not exist!</Typography>
      </Box>
      <Footer />
    </>
  )
}

export default NotFound