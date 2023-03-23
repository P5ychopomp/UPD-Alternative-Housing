import { Box, Container } from '@chakra-ui/react'
import React from 'react'

const LandlordLogin = () => {
  return (
    //<ChakraProvider theme={Theme}>
      <Container mt='60' alignItems='center' centerContent>
        <Box maxW='50%'color='#58152E'>
          <h1>Welcome Landlords and Landladies,</h1>
        </Box>
        <Box mb='50' maxW='50%'color='#242424'>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra,
            adipiscing diam faucibus nisl ut eget eleifend. Tellus nec pharetra, at non amet quam.</p>
          <br></br>
        </Box>

        <Box minW='80%'color='#58152E'>
          <h1>Login/Sign up</h1>
          <br></br>
        </Box>

        <Box borderRadius='lg' overflow='hidden' boxShadow='0px 0px 15px 1px #dbdbdb' padding='10'>
        <Grid
            templateRows='repeat(7, 1fr)'
            templateColumns='repeat(10, 1fr)'
            gap={4}>

          <GridItem rowSpan={1} colSpan={10}></GridItem>

          <GridItem rowSpan={7} colSpan={1}></GridItem>

          <GridItem rowSpan={5} colSpan={4}>
            <Image boxSize='250px' objectFit='cover' borderRadius='lg' src='landlord-image-1.png' alt='Landlord Icon'/>
          </GridItem>

          <GridItem colSpan={4} rowSpan={1}></GridItem>
          
          <GridItem colSpan={4} rowSpan={1}>
            <Input placeholder='Email' size='lg' />
          </GridItem>
          <GridItem colSpan={4} rowSpan={1}>
            <Input placeholder='Password' />
          </GridItem>

          <GridItem colSpan={4} rowSpan={1}>
            <Button colorScheme='red'>Log in</Button>
          </GridItem>

          <GridItem colSpan={4} rowSpan={1}>
            <h4> Don't have an account? Create account</h4>
          </GridItem>

          <GridItem rowSpan={1} colSpan={10}></GridItem>

        </Grid>
        </Box>
      </Container>

    //</ChakraProvider>
  )
}

export default LandlordLogin