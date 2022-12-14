import { useState, useEffect } from 'react';
import {
  Text, RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderMark,
  Tooltip, Box, Flex, Center, Container, Stack, Radio, RadioGroup, Button
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const SearchFilters = ({ setKeywords, keywords, setQuery, setPage, filters, setFilters }) => {

  const [sf] = useState({
    sfrate: [0, 50000],
    sflotArea: [0, 50],
    sffurnishType: [],
    sfcurfew: [],
    sflotType: [],
    sfoccupy: [],
    sfminStay: [],
    sfinclusion: []
  });

  const sessionHandler = (defaultValue) => {
    const stored = sessionStorage.getItem("rawFilters");
    if (!stored) {
      return defaultValue;
    }
    return JSON.parse(stored);
  }

  const sh = sessionHandler(sf);
  const [rate, setRate] = useState([sh.sfrate[0], sh.sfrate[1]]);
  const [lotArea, setlotArea] = useState([sh.sflotArea[0], sh.sflotArea[1]]);
  const [furnishType, setFurnishType] = useState(sh.sffurnishType);
  const [curfew, setCurfew] = useState(sh.sfcurfew);
  const [lotType, setlotType] = useState(sh.sflotType);
  const [occupy, setOccupy] = useState(sh.sfoccupy);
  const [minStay, setMinStay] = useState(sh.sfminStay);
  const [inclusion, setInclusion] = useState(sh.sfinclusion);
  const [resetButton, setResetButton] = useState(false);

  useEffect(() => {
    const sf = {
      sfrate: rate,
      sflotArea: lotArea,
      sffurnishType: furnishType,
      sfcurfew: curfew,
      sflotType: lotType,
      sfoccupy: occupy,
      sfminStay: minStay,
      sfinclusion: inclusion
    }
    sessionStorage.setItem("rawFilters", JSON.stringify(sf))
    sessionStorage.setItem("filters", JSON.stringify(filters))

  }, [filters, curfew, furnishType, inclusion, lotArea, lotType, minStay, occupy, rate])



  const handleFilterClick = () => {
    let filters1 = `&ratemin=${rate[0]}&ratemax=${rate[1]}&lotmin=${lotArea[0]}&lotmax=${lotArea[1]}`;
    for (const e of furnishType) filters1 += `&furnished=${e}`;
    for (const e of curfew) filters1 += `&curfew=${e}`;
    for (const e of lotType) filters1 += `&type=${e}`;
    for (const e of occupy) filters1 += `&occupancy=${e}`;
    for (const e of minStay) filters1 += `&stay=${e}`;
    for (const e of inclusion) filters1 += `&inclusions=${e}`;
    setFilters(filters1);
    setPage(0);
  };

  return (
    <Center>
      <Container borderTop='none' borderBottomRadius='30px' borderWidth='3px' borderColor='gray.50' height='fit-content' pb='5' pt='7' alignItems='stretch' minW='100%'>
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
                defaultValue={[sh.sfrate[0], sh.sfrate[1]]}
                min={0}
                max={50000}
                step={500}
                value={rate}
                onChange={(v) => setRate(v)}
                onChangeEnd={(v) => { setRate(v) }}
              >
                <RangeSliderMark color='gray.500' value={50000} mt='-6' ml='-2' fontSize={'9'}>
                  Max
                </RangeSliderMark>
                <RangeSliderMark color='gray.500' value={0} mt='-6' ml='-2' fontSize={'9'}>
                  Min
                </RangeSliderMark>
                <RangeSliderTrack >
                  <RangeSliderFilledTrack bg='#7b1113' />
                </RangeSliderTrack>
                <Tooltip
                  isOpen
                  bg='none'
                  color='#7b1113'
                  placement='bottom'
                  fontWeight='black'
                  shadow='none'
                  mt='-2'
                  label={`₱${sh.sfrate[1]}`}
                >
                  <RangeSliderThumb bg='#7b1113' index={1} />
                </Tooltip>
                <Tooltip
                  isOpen
                  bg='none'
                  color='#7b1113'
                  placement='bottom'
                  fontWeight='black'
                  shadow='none'
                  mt='-2'
                  label={`₱${sh.sfrate[0]}`}
                >
                  <RangeSliderThumb bg='#7b1113' index={0} />
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
                defaultValue={[sh.sflotArea[0], sh.sflotArea[1]]}
                value={lotArea}
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
                  <RangeSliderFilledTrack bg='#7b1113' />
                </RangeSliderTrack>
                <Tooltip
                  isOpen
                  bg='none'
                  color='#7b1113'
                  placement='bottom'
                  fontWeight='black'
                  shadow='none'
                  mt='-2'
                  label={`${sh.sflotArea[1]}`}
                >
                  <RangeSliderThumb bg='#7b1113' index={1} />
                </Tooltip>
                <Tooltip
                  isOpen
                  bg='none'
                  color='#7b1113'
                  placement='bottom'
                  fontWeight='black'
                  shadow='none'
                  mt='-2'
                  label={`${sh.sflotArea[0]}`}
                >
                  <RangeSliderThumb bg='#7b1113' index={0} />
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
              <RadioGroup colorScheme='upd' size='sm' onChange={(v) => { setFurnishType(v) }} defaultValue={sh.sffurnishType} value={furnishType}
              >
                <Stack ml='-2' mt='2' direction={['column']}>
                  <Radio value='0'>None</Radio>
                  <Radio value='1'>Semi</Radio>
                  <Radio value='2'>Full</Radio>
                </Stack>
              </RadioGroup>
            </Box>
            <Box>
              <Text fontWeight='black' ml='-2' mt='1em' >
                Curfew
              </Text >
              <RadioGroup colorScheme='upd' size='sm' onChange={(v) => setCurfew(v)} defaultValue={sh.sfcurfew} value={curfew}>
                <Stack ml='-2' mt='2' direction={['column']}>
                  <Radio value='0'>None</Radio>
                  <Radio value='1'>Has curfew</Radio>
                </Stack>
              </RadioGroup>
            </Box>
          </Container>
          {/* Lot Type */}
          <Container width='11em' mr='5' ml='5'>
            <Box>
              <Text fontWeight='black' ml='-2' mt='2em' >
                Lot Type
              </Text >
              <RadioGroup colorScheme='upd' size='sm' onChange={(v) => { setlotType(v) }} defaultValue={sh.sflotType} value={lotType}>
                <Stack ml='-2' mt='2' direction={['column']}>
                  <Radio value='0'>Condominium</Radio>
                  <Radio value='1'>Dormitory</Radio>
                  <Radio value='2'>Apartment</Radio>
                  <Radio value='3'>Boarding House</Radio>
                </Stack>
              </RadioGroup>
            </Box>
          </Container>
          {/* Occupancy and Minimum Stay */}
          <Container width='11em' mr='5' ml='5'>
            <Box>
              <Text fontWeight='black' ml='-2' mt='2em' >
                Occupancy
              </Text >
              <RadioGroup colorScheme='upd' size='sm' onChange={(v) => { setOccupy(v) }} defaultValue={sh.sfoccupy} value={occupy}>
                <Stack ml='-2' mt='2' direction={['column']}>
                  <Radio value='0'>Solo</Radio>
                  <Radio value='1'>Shared</Radio>
                </Stack>
              </RadioGroup>
            </Box>
            <Box>
              <Text fontWeight='black' ml='-2' mt='2em' >
                Minimum Stay
              </Text >
              <RadioGroup colorScheme='upd' size='sm' onChange={(v) => { setMinStay(v) }} defaultValue={sh.sfminStay} value={minStay}>
                <Stack ml='-2' mt='2' direction={['column']}>
                  <Radio value='0'>1 - 6 months</Radio>
                  <Radio value='1'>7 - 12 months</Radio>
                  <Radio value='2'>13 months or more</Radio>
                </Stack>
              </RadioGroup>
            </Box>
          </Container>
          {/* Rent Inclusion and Amenities */}
          <Container width='11em' mr='5' ml='5'>
            <Box>
              <Text fontWeight='black' ml='-2' mt='2em' >
                Rent Inclusion <br />
                and Amenities
              </Text >
              <RadioGroup colorScheme='upd' size='sm' onChange={(v) => { setInclusion(v) }} defaultValue={sh.sfinclusion} value={inclusion}>
                <Stack ml='-2' mt='2' direction={['column']}>
                  <Radio value='0'>Electricity</Radio>
                  <Radio value='1'>Water</Radio>
                  <Radio value='2'>Own Wifi</Radio>
                  <Radio value='3'>Own Kitchen</Radio>
                  <Radio value='4'>Parking</Radio>
                </Stack>
              </RadioGroup>
            </Box>
          </Container>
        </Flex>
        <Flex justifyContent='flex-end' mt='8'>
          <Button colorScheme='gray' color="gray.600" borderRadius='full' variant='outline' size='sm' mr='2'
            onClick={() => {
              sessionStorage.clear()
              setRate([0, 50000]);
              setlotArea([0, 50]);
              setFurnishType([]);
              setCurfew([]);
              setlotType([]);
              setOccupy([]);
              setMinStay([]);
              setInclusion([]);
              setResetButton(!resetButton);
              setFilters('');
              setPage(0);
              setKeywords('');
              setQuery('');
            }}>
            Reset
          </Button>
          <Button rightIcon={<ArrowForwardIcon />} colorScheme='upd' borderRadius='full' variant='outline' size='sm'
            onClick={() => {
              handleFilterClick();
              if (keywords !== '') setQuery(`q=${keywords}`);
            }}>
            Apply
          </Button>

        </Flex>

      </Container>
    </Center>


  )
}

export default SearchFilters