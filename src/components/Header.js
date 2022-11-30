import React from 'react'
import { ChakraProvider, Container } from '@chakra-ui/react'

const Header = ({ title, onAdd, showAdd }) => {
  return (
    <ChakraProvider>
      <Container maxWidth='100%' mb='5'>
        Logo
      </Container>
    </ChakraProvider>
)}


/* CSS in JS
const headingStyle = {
  color: 'red', 
  backgroundColor: 'black'
} */

export default Header