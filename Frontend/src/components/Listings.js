import Card from './Card'
import { Container, Flex } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'
import { Link } from "react-router-dom";

const Listings = ({ properties }) => {

    return (
        <ChakraProvider>
            <Container minWidth='100%' alignItems='center' justifyContent='center' centerContent >
                <Flex flexWrap='wrap' justifyContent='center' gap={6}>
                    {properties.map((property) => (
                        <div key={property.property_id} onclick="window.scrollTo(0, 0);">
                            <Link to={{
                                pathname: `/${property.property_id}`,
                            }
                            }>
                                <Card property={property} />
                            </Link>
                        </div>
                    ))}
                </Flex>
            </Container>
        </ChakraProvider>
    )
}

export default Listings