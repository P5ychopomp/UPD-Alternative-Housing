import { useState, useEffect } from 'react';
import { Text, RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderMark,
  Tooltip, Box, Flex, Center, Container, Stack, Checkbox, CheckboxGroup } from '@chakra-ui/react';
import Theme from './Theme';

export let apiFilters = {
  min_rate: 3750.00,
  max_rate: 8000.00,
  max_lot_area: 15.00,
  min_lot_area: 10.00,
  lot_type: "Boarding House",
  min_stay: 12,
  num_bedrooms: 1,
  num_bathrooms: 0,
  occupancy: 1,
  furnishing: "Full",
  curfew: 0,
  inclusion: [],
}


const SearchFilters = () => {
  const [rate, setRate] = useState([0,15000])
  const [lotArea, setlotArea] = useState([0,30])

  return (
    <Center theme='Theme'>
      <Flex borderTop='none' borderBottomRadius='30px' borderWidth='3px' borderColor='gray.50' height='fit-content' width='100%' mt='-4' p='0px 15px 20px 15px' justifyContent='center' flexDirection='row' flexWrap={'wrap'} alignItems='stretch'>
        <Container width='12em'>
        <Box  >
          <Text fontWeight='black' ml='-2' mt='2em' >
            Rate
          </Text >
          <RangeSlider
            mt='1.5em'
            id='slider'
            defaultValue={[rate[0], rate[1]]}
            min={0}
            max={50000}
            step={500}
            onChange={(v) => setRate(v)}
            onChangeEnd={(v) => {apiFilters['min_rate'] = v[0]; apiFilters['max_rate'] = v[1];}}
          >
            <RangeSliderMark color='gray.500' value={50000} mt='-6' ml='-2' fontSize={'9'}>
            Max
          </RangeSliderMark>
          <RangeSliderMark color='gray.500' value={0} mt='-6' ml='-2' fontSize={'9'}>
            Min
          </RangeSliderMark>
            <RangeSliderTrack >
              <RangeSliderFilledTrack bg='#7b1113'/>
            </RangeSliderTrack>
            <Tooltip
              isOpen
              bg='none'
              color='#7b1113'
              placement='bottom'
              fontWeight='black'
              shadow='none'
              mt='-2'
              label={`₱${rate[1]}`}
            >
              <RangeSliderThumb bg='#7b1113'index={1}/>
            </Tooltip>
            <Tooltip
              isOpen
              bg='none'
              color='#7b1113'
              placement='bottom'
              fontWeight='black'
              shadow='none'
              mt='-2'
              label={`₱${rate[0]}`}
            >
              <RangeSliderThumb bg='#7b1113' index={0}/>
            </Tooltip>
            
          </RangeSlider>
          
        </Box>
        <Box>
        <Text fontWeight='black' ml='-2' mt='2em' >
            Lot Area (sq. m.)
          </Text >
          
          <RangeSlider
            mt='1.5em'
            id='slider'
            defaultValue={[lotArea[0], lotArea[1]]}
            min={0}
            max={50}
            onChange={(v) => setlotArea(v)}
            onChangeEnd={(v) => setlotArea(v)}
          >
            <RangeSliderMark color='gray.500' value={50} mt='-6' ml='-2' fontSize={'9'}>
            Max
          </RangeSliderMark>
          <RangeSliderMark color='gray.500' value={0} mt='-6' ml='-2' fontSize={'9'}>
            Min
          </RangeSliderMark>
            <RangeSliderTrack >
              <RangeSliderFilledTrack bg='#7b1113'/>
            </RangeSliderTrack>
            <Tooltip
              isOpen
              bg='none'
              color='#7b1113'
              placement='bottom'
              fontWeight='black'
              shadow='none'
              mt='-2'
              label={`${lotArea[1]}`}
            >
              <RangeSliderThumb bg='#7b1113'index={1}/>
            </Tooltip>
            <Tooltip
              isOpen
              bg='none'
              color='#7b1113'
              placement='bottom'
              fontWeight='black'
              shadow='none'
              mt='-2'
              label={`${lotArea[0]}`}
            >
              <RangeSliderThumb bg='#7b1113' index={0}/>
            </Tooltip>
            
          </RangeSlider>
          
        </Box>
        </Container>
        <Container width='10em'>
        <Box>
          <Text fontWeight='black' ml='-2' mt='2em' >
            Furnishing
          </Text >
          <CheckboxGroup colorScheme='upd' size='sm' defaultValue={['Semi']}>
            <Stack ml='-2'  mt='2' direction={['column']}>
              <Checkbox value='None'>None</Checkbox>
              <Checkbox value='Semi'>Semi</Checkbox>
              <Checkbox value='Full'>Full</Checkbox>
            </Stack>
          </CheckboxGroup>
        </Box>
        <Box>
          <Text fontWeight='black' ml='-2' mt='1em' >
            Curfew
          </Text >
          <CheckboxGroup colorScheme='upd' size='sm' defaultValue={['None']}>
            <Stack ml='-2'  mt='2' direction={['row']}>
              <Checkbox value='None'>None</Checkbox>
            </Stack>
          </CheckboxGroup>
        </Box>
        </Container>
        <Container width='10em'>
        <Box>
          <Text fontWeight='black' ml='-2' mt='2em' >
            Lot Type
          </Text >
          <CheckboxGroup colorScheme='upd' size='sm' defaultValue={['Dormitory', 'Condominium']}>
            <Stack ml='-2'  mt='2' direction={['column']}>
              <Checkbox value='Condominium'>Condominium</Checkbox>
              <Checkbox value='Dormitory'>Dormitory</Checkbox>
              <Checkbox value='Apartment'>Apartment</Checkbox>
              <Checkbox value='Boarding House'>Boarding House</Checkbox>
            </Stack>
          </CheckboxGroup>
        </Box>
        </Container>
        <Container width='10em'>
        <Box>
          <Text fontWeight='black' ml='-2' mt='2em' >
            Occupancy
          </Text >
          <CheckboxGroup colorScheme='upd' size='sm' defaultValue={['Solo']}>
            <Stack ml='-2'  mt='2' direction={['column']}>
              <Checkbox value='Solo'>Solo</Checkbox>
              <Checkbox value='Shared'>Shared</Checkbox>
            </Stack>
          </CheckboxGroup>
        </Box>
        </Container>
        <Container width='10em'>
        <Box>
          <Text fontWeight='black' ml='-2' mt='2em' >
            Minimum Stay
          </Text >
          <CheckboxGroup colorScheme='upd' size='sm' defaultValue={['[6,11]']}>
            <Stack ml='-2'  mt='2' direction={['column']}>
              <Checkbox value='[1,5]'>1 - 5 mos</Checkbox>
              <Checkbox value='[6,11]'>6 - 11 mos</Checkbox>
              <Checkbox value='[12,inf]'>12 mos or more</Checkbox>
            </Stack>
          </CheckboxGroup>
        </Box>
        </Container>
        <Container width='10em'>
        <Box>
          <Text fontWeight='black' ml='-2' mt='2em' >
            Rent Inclusion <br/>
            and Amenities
          </Text >
          <CheckboxGroup colorScheme='upd' size='sm' defaultValue={['a1', 'a2']}>
            <Stack ml='-2'  mt='2' direction={['column']}>
              <Checkbox value='a1'>Electricity</Checkbox>
              <Checkbox value='a2'>Water</Checkbox>
              <Checkbox value='a3'>Own Wifi</Checkbox>
              <Checkbox value='a4'>Own Kitchen</Checkbox>
              <Checkbox value='a5'>Parking</Checkbox>
            </Stack>
          </CheckboxGroup>
        </Box>
        </Container>
        
      </Flex>
    </Center>
    
  )
}

export default SearchFilters