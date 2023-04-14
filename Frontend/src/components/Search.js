import { ChakraProvider, Input, Container, Grid, GridItem, FormControl} from '@chakra-ui/react';
import Theme from './Theme';
import { IoSearchCircle, IoFilter } from 'react-icons/io5';
import { useState } from 'react';

const Search = ({ keywords, setKeywords, sfVisible, setSfVisible, setQuery }) => {

const [isError, setisError] = useState(false);

  return (
    <div>
      <ChakraProvider theme={Theme} >
        <Container minW='90%' mt='20'>
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
              <FormControl >
                <Input
                  userSelect='none'
                  variant='unstyled'
                  isInvalid={isError}

                  placeholder='Enter keyword' p='2'
                  _placeholder={{ opacity: 1, color: 'gray.400' }}
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  onKeyPress={(v) => {
                    
                    if (v.key === "Enter") {
                      if (keywords.match(/[`'/*%;+|<>=!.-]/)) {
                        setisError(true);
                      } else {
                        setisError(false);
                      setQuery(`q=${keywords}`);
                      }
                    }
                  }
                  }
                />
              </FormControl>
              
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
                onClick={() => {
                  if (keywords.match(/[`'/*%;+|<>=!.-]/)) {
                    setisError(true);
                  } else {
                    setisError(false);
                  setQuery(`q=${keywords}`);
                  }
                }} />
            </GridItem>
          </Grid>
          {!isError ? (!isError) : (<Container color='upd.500' mt='1' ml='8' maxW='100%' fontWeight='bold' fontSize='12'>Keyword can't contain the following characters: ` ' / * % ; + | &lt; &gt; = ! - .  </Container>)}
        </Container>
        
      </ChakraProvider>
    </div>


  );
};

export default Search;
