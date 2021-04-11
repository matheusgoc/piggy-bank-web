import React from 'react'
import { Box } from '@material-ui/core'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const SignIn = () => {
  return (
    <>
      <Header />
      <Box height="80vh"
           display="flex"
           flexDirection="column"
           justifyContent="center"
           alignItems="center"
           letterSpacing={16}
           color="primary.dark"
           fontSize="h2.fontSize">
        Sign In
      </Box>
      <Footer />
    </>
  )
}

export default SignIn