import Card from './Card'
import { Center, Container, Flex, Spacer} from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'
import { Outlet, Link } from "react-router-dom";


const Listings = ({ properties }) => {
    return (
        <ChakraProvider>
            <Center>
                <Container minWidth='100%' alignItems='center' justifyContent='center' margin='auto'>
                    <Flex flexWrap='wrap' gap={6}>
                            {properties.map((property) => (
                                <Link to="results">
                                <Card property={property} />
                                </Link>
                            ))}
                            
                        <Outlet />
                        <Spacer />
                    </Flex>
                </Container>
                
            </Center>
        </ChakraProvider>
    )
}

export default Listings