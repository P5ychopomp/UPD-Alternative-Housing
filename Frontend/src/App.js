import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Properties from "./pages/Properties";
import Faqs from "./pages/Faqs";
import About from "./pages/About";
import TermsofService from "./pages/TermsofService";
import Privacy from "./pages/Privacy";
import ContactUs from "./pages/ContactUs";
import PostingGuides from "./pages/PostingGuides";
import Safety from "./pages/Safety";
import SearchGuides from "./pages/SearchGuides";
import Home from "./pages/Home";
import "./styles/App.css";
import {
  Card,
  CardBody,
  Center,
  ChakraProvider,
  Container,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import LandlordRegistration from "./pages/Landlord/LandlordRegistration";
import LandlordLogin from "./pages/Landlord/LandlordLogin";
import Theme from "./components/Theme";

const App = () => {
  return (
    <ChakraProvider theme={Theme}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Container minW="100%" mt="20">
              <VStack minW="10%">
                <Stack alignItems="center">
                  <Text
                    bgGradient="linear(to-t, #FFD0D6, #792E3F)"
                    bgClip="text"
                    fontSize="6xl"
                    fontWeight="extrabold"
                    textAlign="center"
                  >
                    Find your Isko home
                  </Text>
                  <Text
                    textAlign="center"
                    fontSize={"md"}
                    color={"gray.500"}
                    fontStyle="italic"
                    maxW="80%"
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean et urna imperdiet, interdum elit eget, scelerisque
                    nunc. Duis sagittis feugiat semper.
                  </Text>
                </Stack>

                <Center>
                  <Image
                    mt="20"
                    src="landing.png"
                    alt="Student dorm room"
                    maxW="80%"
                  />
                </Center>
              </VStack>
              <Center mt="30">
                <Flex gap="8" flexWrap="wrap" justifyContent="center">
                  <Link to="/Home" variant="unstyled">
                    <Card maxW="sm" boxShadow="0px 0px 5px 1px #dbdbdb" className="card">
                      <CardBody>
                        <HStack>
                          <Image src="student.png" maxW="50%" />
                          <Container>
                            <Text
                              fontWeight="extrabold"
                              lineHeight='5'
                            >
                              I am looking for a place to stay
                            </Text>
                            <Text mt="3" color="gray.500" fontSize="xs" lineHeight='4'>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit.
                            </Text>
                          </Container>
                        </HStack>
                      </CardBody>
                    </Card>
                  </Link>
                  <Link to="/LandlordLogin" variant="unstyled">
                    <Card maxW="sm" boxShadow="0px 0px 5px 1px #dbdbdb" className="card">
                      <CardBody>
                        <HStack>
                          <Image src="landlord.png" maxW="50%" />
                          <Container>
                            <Text
                              fontWeight="extrabold"
                              lineHeight='5'
                            >
                              I want to rent my space
                            </Text>
                            <Text mt="3" color="gray.500" fontSize="xs" lineHeight='4'>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit.
                            </Text>
                          </Container>
                        </HStack>
                      </CardBody>
                    </Card>
                  </Link>
                </Flex>
              </Center>
            </Container>
          }
        />

        <Route path="/LandlordLogin" element={<LandlordLogin />} />
        <Route path="/LandlordRegister" element={<LandlordRegistration />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/AboutUs" element={<About />} />
        <Route path="/Faqs" element={<Faqs />} />
        <Route path="/:id" element={<Properties />} />
        <Route path="/TermsofService" element={<TermsofService />} />
        <Route path="/Privacy" element={<Privacy />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/PostingGuides" element={<PostingGuides />} />
        <Route path="/SearchGuides" element={<SearchGuides />} />
        <Route path="/Safety" element={<Safety />} />
      </Routes>
      <Footer />
    </ChakraProvider>
  );
};

export default App;
