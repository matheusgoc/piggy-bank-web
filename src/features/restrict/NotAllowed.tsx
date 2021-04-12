import React from 'react'
import { Box, Button, Typography } from '@material-ui/core'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const NotAllowed = () => {
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
        <Typography variant={'subtitle1'}>You must be authenticated to access this page!</Typography>
        <Button href='/signin' variant='outlined' color='primary' size='large' style={{marginTop: 30}}>Sign In</Button>
      </Box>
      <Footer />
    </>
  )
}

export default NotAllowed