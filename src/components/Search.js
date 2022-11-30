import { useState } from 'react';
import {ChakraProvider, InputGroup, Input, InputLeftElement, InputRightElement, Button, Box, Container, Grid, GridItem} from '@chakra-ui/react';
import SearchFilters from './SearchFilters';
import Theme from './Theme';
import { IoSearchCircle, IoFilter } from 'react-icons/io5';

const Search = ({ properties }) => {
  const [searchFilters, setSearchFilters] = useState(false);

  return (
    <div className='search'>
        <ChakraProvider theme={Theme} >
        <Grid
          templateColumns='2.5em 1fr 3em'
          alignItems='center'
          borderRadius='1000px'
          borderWidth='3px'
          borderColor='gray.50'
          boxShadow='0px 0px 15px 1px #ebebeb'
          >
          <GridItem
            alignItems='center'
            display='flex'
            pl='4'
            pt='1px'
            >
            <IoFilter
              type='button'
              color='#58152e'
              cursor='pointer'
              size={20}
              onClick={() => setSearchFilters(!searchFilters)}
            /> 
          </GridItem>
          <GridItem>
            <Input
                userSelect='none'
                variant='unstyled'
                placeholder='Enter keyword' p='2'
                _placeholder={{ opacity: 1, color: 'gray.400' }}
                />
          </GridItem>
          <GridItem
              justifyContent='center'
              alignItems='center'
              display='flex'>
            <IoSearchCircle
                cursor='pointer'
                type='button'
                color='#58152e'
                size={25}/>
          </GridItem>
        </Grid>
        {searchFilters && <SearchFilters />}

               
           
        </ChakraProvider>
    </div>
    
  );
};

export default Search;
