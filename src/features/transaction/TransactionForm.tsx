import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { useParams } from "react-router-dom"
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const TransactionForm = () => {

  const { id } = useParams()

  return (
    <>
      <Header />
      <Box height="80vh"
           display="flex"
           flexDirection="column"
           justifyContent="center"
           alignItems="center"
           color="primary.dark">
        <Typography variant={'h2'} style={{letterSpacing: 16}}>
          Transaction Form
        </Typography>
        <Typography variant={'h4'} color={"textSecondary"}>
          {(id)? `Edit Transaction ID nº ${id}!` : 'Add new transaction!'}
        </Typography>
      </Box>
      <Footer />
    </>
  )
}

export default TransactionForm