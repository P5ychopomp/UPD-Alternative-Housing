import { Box, ChakraProvider, Container } from '@chakra-ui/react'

const PostingGuides = () => {
  return (
    <ChakraProvider>
      <Container mt='20' alignItems='center' centerContent>
      <Box mb='50' fontSize='28' fontWeight='bold' alignItems='center' >
        <h1>Posting Guides</h1>
      </Box>
    </Container>
    </ChakraProvider>
  )
}

export default PostingGuides