import { Box, Image, ChakraProvider, Text, Container, Grid, GridItem } from '@chakra-ui/react'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import Theme from './Theme'

const prop = {
    imageUrl: 'https://bit.ly/2Z4KKcF',
    property_name: 'House1',
    unit_num: '943',
    street_address: 'Lands',
    brgy: 'Diliman',
    city_municip: 'Quezon City',
    rate: '19250.00',
    lot_area: '36.00',
    lot_type: 'Apartment',
    min_month_stay: '24',
    num_bedrooms: '2',
    num_bathrooms: '1',
    occupancy: '6',
    furnishing: 'Full',
    curfew: '0',
    ameneties: 'Own Wifi'
  }

const landlord = {
    name: 'Susan Reyes',
    number: '0917-453-5455',
    email: 'susan.reyes324@gmail.com',
    socmed: 'fb.com\\screyes2',
    imageUrl: 'https://tinyurl.com/ywfyn8kd'
}

const PropertyTemp = ({ property }) => {
  return (
    <ChakraProvider theme={Theme}>
        <Container minW='80%' mt='20' fontWeight='bold' as='h2' mb='20'>
            <Box mb='5' color='#792E3F' >
            <Link href="/Listings">{'<<'}Back</Link>
            </Box>

            <Box
            fontWeight='bolder'
            fontSize='35px'
            lineHeight='tight'
            noOfLines={2}
            letterSpacing='wide'
            color='#792E3F'
            >
            {property.property_name}
            </Box>

            <Grid
            templateRows='repeat(2, 1fr)'
            templateColumns='repeat(3, 1fr)'
            gap={4}
            >
            <GridItem rowSpan={2} colSpan={2}>
                <Image borderRadius='lg' src={prop.imageUrl} alt='Property Image 1'/>
            </GridItem>
            <GridItem rowSpan={1}>
                <Image borderRadius='lg' src={prop.imageUrl} alt='Property Image 2'/>
            </GridItem>
            <GridItem rowSpan={1}>
                <Image borderRadius='lg' src={prop.imageUrl} alt='Property Image 3'/>
            </GridItem>
            </Grid>
        </Container>
        
        <Container minW='80%' alignItems='center'>
            <Box borderRadius='lg' overflow='hidden' boxShadow='0px 0px 15px 1px #dbdbdb' padding='10'>
                <Grid
                templateRows='repeat(11, 1fr)'
                templateColumns='repeat(4, 1fr)'
                gap={5}
                >
                <GridItem rowSpan={1} colSpan={2}>
                    <Box maxW='70%'
                        borderRadius='lg' 
                        px='10'
                        fontSize='25px'
                        backgroundColor='#58152E'
                        color='#FFFFFF'
                        >
                            ₱ Price {property.rate}
                    </Box>
                </GridItem>
                <GridItem rowSpan={1} >
                <Box letterSpacing='wide' display='flex' >
                    <Icon icon='ph:house-line' inline='true' height='30' color='#58152E'/>
                    <Text color='#58152E' fontWeight='bold' fontSize='20px' ml='5' mr='2'> Lot Type</Text>
                 </Box>
                 </GridItem>
                <GridItem rowSpan={1}>
                    <Text fontWeight='bold' fontSize='20px'>{property.lot_type}</Text>
                </GridItem>

                <GridItem rowSpan={1} >
                <Box letterSpacing='wide' display='flex' >
                    <Icon icon="bi:people" inline='true' height='30' color='#58152E'/>
                    <Text color='#58152E' fontWeight='bold' fontSize='20px' ml='5' mr='2'> Occupancy</Text>
                 </Box>
                </GridItem>
                <GridItem rowSpan={1}>
                    <Text fontWeight='bold' fontSize='20px'>{property.occupancy}</Text>
                </GridItem>
                <GridItem rowSpan={1} >
                <Box letterSpacing='wide' display='flex' >
                    <Icon icon='tabler:clock-hour-10' inline='true' height='30' color='#58152E'/>
                    <Text color='#58152E' fontWeight='bold' fontSize='20px' ml='5' mr='2'> Curfew</Text>
                 </Box>
                </GridItem>
                <GridItem rowSpan={1}>
                    <Text fontWeight='bold' fontSize='20px'>{property.curfew}</Text>
                </GridItem>
                
                <GridItem rowSpan={1} >
                <Box letterSpacing='wide' display='flex' >
                    <Icon icon="fluent:bed-24-regular" inline='true' height='30' color='#58152E'/>
                     <Text color='#58152E' fontWeight='bold' fontSize='20px' ml='5' mr='2'> Bedroom</Text>
                 </Box>
                </GridItem>
                <GridItem rowSpan={1}>
                    <Text fontWeight='bold' fontSize='20px'>{property.num_bedrooms}</Text>
                </GridItem>
                <GridItem rowSpan={1} >
                     <Text color='#58152E' fontWeight='bold' fontSize='16px'>Rent Inclusions and Ameneties:</Text>
                </GridItem>
                <GridItem rowSpan={1} colSpan={1}></GridItem>
                <GridItem rowSpan={1} >
                <Box letterSpacing='wide' display='flex' >
                    <Icon icon="ph:bathtub" inline='true' height='30' color='#58152E'/>
                     <Text color='#58152E' fontWeight='bold' fontSize='20px' ml='5' mr='2'> Bathroom</Text>
                 </Box>
                </GridItem>
                <GridItem rowSpan={1}>
                    <Text fontWeight='bold' fontSize='20px'>{property.num_bathrooms}</Text>
                </GridItem>
                <GridItem rowSpan={1} colSpan={2}></GridItem>
                

                <GridItem rowSpan={1} >
                <Box letterSpacing='wide' display='flex' >
                    <Icon icon='tabler:ruler-measure' inline='true' height='30' color='#58152E'/>
                    <Text color='#58152E' fontWeight='bold' fontSize='20px' ml='5' mr='2'> Area</Text>
                 </Box>
                 </GridItem>
                <GridItem rowSpan={1}>
                    <Text fontWeight='bold' fontSize='20px'>{property.lot_area} sqm.</Text>
                </GridItem>
                <GridItem rowSpan={1}>
                    <Text fontWeight='bold' fontSize='16px'>{property.ameneties}</Text>
                </GridItem>
                <GridItem rowSpan={1}></GridItem>

                <GridItem rowSpan={1} >
                <Box letterSpacing='wide' display='flex' >
                    <Icon icon='ion:cube-outline' inline='true' height='30' color='#58152E'/>
                    <Text color='#58152E' fontWeight='bold' fontSize='20px' ml='5' mr='2'> Furnishing</Text>
                 </Box>
                 </GridItem>
                <GridItem rowSpan={1}>
                    <Text fontWeight='bold' fontSize='20px'>{property.furnishing}</Text>
                </GridItem>
                <GridItem rowSpan={1} colSpan={2}></GridItem>

                <GridItem rowSpan={1} colSpan={1}>
                <Box letterSpacing='wide' display='flex' >
                    <Icon icon='bi:hourglass-split' inline='true' height='30' color='#58152E'/>
                    <Text color='#58152E' fontWeight='bold' fontSize='20px' ml='5' mr='2'> Min Stay</Text>
                 </Box>
                 </GridItem>
                <GridItem rowSpan={1}>
                    <Text fontWeight='bold' fontSize='20px'>{property.min_month_stay} months</Text>
                </GridItem>
                <GridItem rowSpan={1} colSpan={2}></GridItem>

                <GridItem rowSpan={1}>
                    <Text color='#58152E' fontWeight='bold' fontSize='15px'>Contact details:</Text>
                </GridItem>
                <GridItem rowSpan={1} colSpan={3}></GridItem>

                <GridItem rowSpan={4}>
                <Image boxSize='150px' borderRadius='full' src={landlord.imageUrl} objectFit='cover' alt='Landlord Profile Picture'/>
                </GridItem>

                <GridItem rowSpan={4}>
                    <Text fontWeight='bold' fontSize='16px'>{landlord.name} </Text>
                    <br/>
                    <Text fontWeight='bold' fontSize='16px'>{landlord.number} </Text>
                    <Text fontWeight='bold' fontSize='16px'>{landlord.email} </Text>
                    <Text fontWeight='bold' fontSize='16px'>{landlord.socmed} </Text>
                </GridItem>

                </Grid> 
            </Box>
        </Container>

    </ChakraProvider>
  )
}

export default PropertyTemp