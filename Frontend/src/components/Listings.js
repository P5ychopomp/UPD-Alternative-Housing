import Card from './Card'
import { Container, Flex } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'
import Link from "next/link";

const Listings = ({ properties }) => {

    return (
        <ChakraProvider>
            <Container minWidth='100%' alignItems='center' justifyContent='center' centerContent >
                <Flex flexWrap='wrap' justifyContent='center' gap={6}>
                    {properties.map((property) => (
                        <div key={property.property_id} >
                            <Link href={{
                                pathname: 'Property',
                                query: { id: `${property.property_id}`}, 
                            }
                            } target="_blank">
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