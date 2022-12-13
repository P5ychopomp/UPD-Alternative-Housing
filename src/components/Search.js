import { useState} from 'react';
import {ChakraProvider, Input, Container, Grid, GridItem} from '@chakra-ui/react';
import Theme from './Theme';
import { IoSearchCircle, IoFilter } from 'react-icons/io5';

const Search = ({ sfVisible, setSfVisible, query, setQuery }) => {
  const [keywords, setKeywords] = useState(query);

  return (
    <div>
        <ChakraProvider theme={Theme} >
          <Container minW='90%'>
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
                  onClick={() => setSfVisible(!sfVisible)}
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
            
          </Container>
        </ChakraProvider>
    </div>
    
    
  );
};

export default Search;
