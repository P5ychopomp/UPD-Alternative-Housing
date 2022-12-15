import { Box, Container } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const ContactUs = () => {
  return (
    <Container mt='60' alignItems='center' centerContent>
      <Box mb='50'>
        <h1>Contact Us</h1>
      </Box>
      <Link to="/">Home</Link>
    </Container>
  )
}

export default ContactUs