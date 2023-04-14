import { Box, Image, Badge, ChakraProvider, Text, Divider } from '@chakra-ui/react'
import { Icon } from '@iconify/react'
import Theme from './Theme'
import './styles/Card.module.css'

const Card = ({ property }) => {
  return (
    <ChakraProvider theme={Theme}>
      <Box maxW='250px' borderRadius='lg' overflow='hidden' boxShadow='0px 0px 15px 1px #dbdbdb' className='card'>
        <Image
          src={'https://bit.ly/2Z4KKcF'}
          alt={property.img_url} />

        <Box p='2' pt='2' pb='0'>
          <Badge borderRadius='full' px='2' colorScheme={
            property.lot_type === 'Condominium' ? 'teal' : property.lot_type === 'Dormitory' ? 'green' : property.lot_type === 'Boarding House' ? 'purple' : 'orange'}>
            {property.lot_type}
          </Badge>
        </Box>
        <Box p='3' pt='1'>
          <Box
            fontWeight='bolder'
            as='h2'
            lineHeight='tight'
            noOfLines={2}
            letterSpacing='wide'
          >
            {property.property_name}
          </Box>

          <Box noOfLines={2} fontWeight='normal' color='gray.400' fontSize='xx-small'>
            {property.unit_num} {property.street_address},<br />
            {property.brgy} {property.city_municip}
          </Box>

          <Box fontWeight='bold' mt='4' color='#7b1113' letterSpacing='wide'>
            ₱ {property.rate}
          </Box>
          <Divider mt='2' />
          <Box
            color='#B0606B'
            fontWeight='normal'
            letterSpacing='wide'
            fontSize='x-small'
            display='flex'
            mt='2'
          >
            <Icon icon="fluent:bed-24-regular" inline='true' height='15' /> <Text ml='1' mr='2'>{property.num_bedrooms}</Text>
            <Icon icon="ph:bathtub" inline='true' height='15' /> <Text ml='1' mr='2'>{property.num_bathrooms}</Text>
            <Icon icon="carbon:area" inline='true' height='15' /> <Text ml='1'>{property.lot_area} sqm</Text>
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  )
}

export default Card