import { Box, Container } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const TermsofService = () => {
  return (
    <Container mt='60' alignItems='center' centerContent>
      <Box mb='50'>
        <h1>Terms of Service</h1>
      </Box>
      <Link to="/">Home</Link>
    </Container>
  )
}

export default TermsofService