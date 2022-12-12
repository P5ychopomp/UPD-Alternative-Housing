import { useState, useEffect } from 'react';
import { Text, RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderMark,
  Tooltip, Box, Flex, Center, Container, Stack, Checkbox, CheckboxGroup, Button } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

  const SearchFilters = ({ props, setProps, q, setQ }) => {
  const [properties, setListings] = useState(props);
  const [rate, setRate] = useState([0,50000]);
  const [lotArea, setlotArea] = useState([0,50]);
  const [furnishType, setFurnishType] = useState([]);
  const [curfew, setCurfew] = useState([]);
  const [lotType, setlotType] = useState([]);
  const [occupy, setOccupy] = useState([]);
  const [minStay, setMinStay] = useState([]);
  const [inclusion, setInclusion] = useState([]);
  const [page, setPage] = useState(1);
  const [url, setUrl] = useState(`http://192.168.1.100:8080/listings?_page=${page}&_sort=property_id&_order=desc&q=${q}`);

  useEffect(() => {
    const getListings = async () => {
      const res = await fetch(url)
      const data = await res.json()
      setListings(data)
    }
    getListings()
  }, [url])
  

  const handleFilterClick = () => {
    let baseUrl = `http://192.168.1.100:8080/listings?_page=${page}&_sort=property_id&_order=desc&q=${q}&rate_gte=${rate[0]}&rate_lte=${rate[1]}&lot_area_gte=${lotArea[0]}&lot_area_lte=${lotArea[1]}`;
    for(const e of furnishType) baseUrl+=`&furnishing=${e}`;
    for(const e of curfew) baseUrl+=`&curfew=${e}`;
    for(const e of lotType) baseUrl+=`&lot_type=${e}`;
    for(const e of occupy) {e === '1' ? baseUrl+=`&occupancy=1` : baseUrl+=`&occupancy_gte=2`};
    for(const e of minStay) baseUrl+=`&min_month_stay=${e}`;
    for(const e of inclusion) baseUrl+=`&inclusions=${e}`;
    setUrl(baseUrl);
  };

  return (
    <Center>
      <Container borderTop='none' borderBottomRadius='30px' borderWidth='3px' borderColor='gray.50' height='fit-content' pb='5' alignItems='stretch' minW='100%'>
        <Flex flexDirection='row' flexWrap={'wrap'} justify='center'>
          {/* Rate and Lot Area */}
          <Container width='11em' mr='5' ml='5'>
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
              onChangeEnd={(v) => setRate(v)}
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
          {/* Furnishing and Curfew */}
          <Container width='11em' mr='5' ml='5'>
          <Box>
            <Text fontWeight='black' ml='-2' mt='2em' >
              Furnishing
            </Text >
            <CheckboxGroup colorScheme='upd' size='sm' onChange={(v) => {setFurnishType(v)}}
            >
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
            <CheckboxGroup colorScheme='upd' size='sm' onChange={(v) => setCurfew(v)}>
              <Stack ml='-2'  mt='2' direction={['column']}>
                <Checkbox value='0'>None</Checkbox>
                <Checkbox value='1'>Has curfew</Checkbox>
              </Stack>
            </CheckboxGroup>
          </Box>
          </Container>
          {/* Lot Type */}
          <Container width='11em' mr='5' ml='5'>
          <Box>
            <Text fontWeight='black' ml='-2' mt='2em' >
              Lot Type
            </Text >
            <CheckboxGroup colorScheme='upd' size='sm' onChange={(v) => {setlotType(v)}}>
              <Stack ml='-2'  mt='2' direction={['column']}>
                <Checkbox value='Condominium'>Condominium</Checkbox>
                <Checkbox value='Dormitory'>Dormitory</Checkbox>
                <Checkbox value='Apartment'>Apartment</Checkbox>
                <Checkbox value='Boarding House'>Boarding House</Checkbox>
              </Stack>
            </CheckboxGroup>
          </Box>
          </Container>
          {/* Occupancy and Minimum Stay */}
          <Container width='11em' mr='5' ml='5'>
          <Box>
            <Text fontWeight='black' ml='-2' mt='2em' >
              Occupancy
            </Text >
            <CheckboxGroup colorScheme='upd' size='sm' onChange={(v) => {setOccupy(v)}}>
              <Stack ml='-2'  mt='2' direction={['column']}>
                <Checkbox value='1'>Solo</Checkbox>
                <Checkbox value='2'>Shared</Checkbox>
              </Stack>
            </CheckboxGroup>
          </Box>
          <Box>
            <Text fontWeight='black' ml='-2' mt='2em' >
              Minimum Stay
            </Text >
            <CheckboxGroup colorScheme='upd' size='sm' onChange={(v) => {setMinStay(v)}}>
              <Stack ml='-2'  mt='2' direction={['column']}>
                <Checkbox value='6'>1 - 6 months</Checkbox>
                <Checkbox value='12'>7 - 12 months</Checkbox>
                <Checkbox value='999'>13 months or more</Checkbox>
              </Stack>
            </CheckboxGroup>
          </Box>
          </Container>
          {/* Rent Inclusion and Amenities */}
          <Container width='11em' mr='5' ml='5'>
          <Box>
            <Text fontWeight='black' ml='-2' mt='2em' >
              Rent Inclusion <br/>
              and Amenities
            </Text >
            <CheckboxGroup colorScheme='upd' size='sm' onChange={(v) => {setInclusion(v)}}>
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
          <Flex justifyContent='flex-end' mt='8'>
          <Button rightIcon={<ArrowForwardIcon />} colorScheme='upd' borderRadius='full' variant='outline' size='sm' 
          onClick={() => {
            handleFilterClick();
            setProps(properties);
          }}>
            Apply Filter
          </Button>
        </Flex>
        
      </Container>
    </Center>
    
  )
}

export default SearchFilters