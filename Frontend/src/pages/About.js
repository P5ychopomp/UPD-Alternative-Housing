import { Box, Container } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const About = () => {
  return (

    <Container mt='60' alignItems='center' centerContent>
      <Box mb='50'>
        <h1>About Us</h1>
        <h2>Version 1.0.0</h2>
      </Box>
      <Link to="/">Home</Link>
    </Container>
  )
}

export default About