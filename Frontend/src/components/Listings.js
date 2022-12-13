import Card from './Card'
import { Center, Container, Flex} from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'
import { Link } from "react-router-dom";
import { useState } from 'react';
import SearchFilters from './SearchFilters';

const Listings = ({ properties }) => {
    
    return (
        <ChakraProvider>
            <Center>
                <Container minWidth='100%' alignItems='center' justifyContent='center' margin='auto' centerContent='true'>
                    <Flex flexWrap='wrap' justifyContent='center' gap={6}>
                            {properties.map((property) => (
                                <div key={property.property_id}>
                                    <Link to={`/property=${property.property_id}`}>
                                    <Card property={property} />
                                    </Link>
                                </div>
                            ))}
                            
                    </Flex>
                </Container>
                
            </Center>
        </ChakraProvider>
    )
}

export default Listings