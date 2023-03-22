import { Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Properties from './pages/Properties';
import Faqs from './pages/Faqs';
import About from './pages/About';
import TermsofService from './pages/TermsofService';
import Privacy from './pages/Privacy';
import ContactUs from './pages/ContactUs';
import PostingGuides from './pages/PostingGuides';
import Safety from './pages/Safety';
import SearchGuides from './pages/SearchGuides';
import Home from './pages/Home';
import './styles/App.css';
import { Card, CardBody, Center, ChakraProvider, Container, HStack, Image, Text, VStack } from '@chakra-ui/react';
import LandlordRegister from './pages/Landlord/LandlordRegister';



const App = () => {
  return (
    <ChakraProvider>
      <div className='container' style={{ overflow: "hidden" }}>
        <Navbar />
          <Routes>
          <Route path='/' element={
              <div>
                <VStack>
                  <Center>
                    <Text
                      bgGradient='linear(to-t, #FFD0D6, #792E3F)'
                      bgClip='text'
                      fontSize='6xl'
                      fontWeight='extrabold'
                    >
                      Find your Isko home
                    </Text>
                  </Center>
                  <Center>
                    <Image src='landing.png' alt='Student dorm room' maxW='80%'/>
                  </Center>
                </VStack>
                <Center>
                  <HStack spacing='10'>
                    <Link to='/Home' variant='unstyled'>
                      <Card maxW='sm'>
                          <CardBody>
                          <HStack>
                            <Image src='student.png' maxW='50%'/>
                            <Container>
                              <Text>
                                I am looking for a place to stay
                              </Text>
                            </Container>                          
                          </HStack>
                          </CardBody>
                      </Card>
                    </Link> 
                    <Link to='/Register' variant='unstyled'>               
                      <Card maxW='sm'>
                          <CardBody>
                          <HStack>
                            <Image src='landlord.png' maxW='50%'/>
                            <Container>
                              <Text>
                                I want to rent my space
                              </Text>
                            </Container>                          
                          </HStack>
                          </CardBody>
                      </Card>
                    </Link>
                  </HStack>
                </Center>
              </div>
              } />
              <Route path='/Register' element={<LandlordRegister />} />
              <Route path='/Home' element={<Home />} />
              <Route path='/AboutUs' element={<About />} />
              <Route path='/Faqs' element={<Faqs />} />
              <Route path='/:id' element={<Properties />} />
              <Route path='/TermsofService' element={<TermsofService />} />
              <Route path='/Privacy' element={<Privacy />} />
              <Route path='/ContactUs' element={<ContactUs />} />
              <Route path='/PostingGuides' element={<PostingGuides />} />
              <Route path='/SearchGuides' element={<SearchGuides />} />
              <Route path='/Safety' element={<Safety />} />
            </Routes>
          </div>
        <Footer />
    </ChakraProvider>
  )
}

export default App