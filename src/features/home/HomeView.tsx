import React from 'react'
import { Box } from '@material-ui/core'

const HomeView = () => {
  return (
    <Box height="100vh"
         display="flex"
         flexDirection="column"
         justifyContent="center"
         alignItems="center"
         letterSpacing={16}
         color="primary.dark"
         fontSize="h2.fontSize">
      Home View
    </Box>
  )
}

export default HomeView