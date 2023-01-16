import { Box, ChakraProvider, Container } from '@chakra-ui/react'

const About = () => {
  return (
    <ChakraProvider>
      <Container mt='20' alignItems='center' centerContent>
      <Box mb='50' fontSize='28' fontWeight='bold' alignItems='center' >
        <h1>About Us</h1>
        <h2>Version 1.0.0</h2>
      </Box>
    </Container>
    </ChakraProvider>
    
  )
}

export default About