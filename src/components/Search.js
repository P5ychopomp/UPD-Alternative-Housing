import { useEffect, useState, useRef } from 'react';
import {ChakraProvider, Input, Container, Grid, GridItem} from '@chakra-ui/react';
import SearchFilters from './SearchFilters';
import Theme from './Theme';
import { IoSearchCircle, IoFilter } from 'react-icons/io5';

const Search = ({ properties, setProperties, query, setQuery }) => {
  const [searchFilters, setSearchFilters] = useState(false);
  const [keywords, setKeywords] = useState(query);

  return (
    <div>
        <ChakraProvider theme={Theme} >
          <Container maxW='80%' mb='10'>
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
                    onChange={(e) => setKeywords(e.target.value)}
                    onKeyPress={(v) => {
                      if(v.key === "Enter") {
                          setQuery(keywords);
                      }}
                    }
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
                    size={25}
                    onClick={()=> setQuery(keywords)}/>
              </GridItem>
            </Grid>
            {searchFilters && <SearchFilters props={properties} setProps={setProperties} q={query} setQ={setQuery} />}
          </Container>
        </ChakraProvider>
    </div>
    
    
  );
};

export default Search;
