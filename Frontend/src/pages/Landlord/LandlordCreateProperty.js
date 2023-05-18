import React, { useState } from "react";
import SidebarWithHeader from "../../components/Landlord/Sidebar.js";
import {
  Box,
  Button,
  ChakraProvider,
  Container,
  Flex,
  Heading,
  Input,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import Theme from "../../components/Theme.js";
import { Icon } from "@iconify/react";
import Axios from "axios";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { fetchAuth } from "../../utils/FetchAuth.js";
Axios.defaults.withCredentials = true;

export const LandlordCreateProperty = () => {
 const navigate = useNavigate();
  useEffect(() => {
    Axios.get(`${fetchAuth}/checkAuth`).then((response) => {
      console.log(response.data.isAuthenticated);
      if (!response.data.isAuthenticated) {
        navigate("/");
      }
    })
  }); 
  return <SidebarWithHeader children={<Content />} />;
};

const Content = () => {
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(false);
  const logout = async () => {
    await Axios.post(`${fetchAuth}/logout`).then((response) => {
      if (response.status === 200) {
        navigate("/")
      }
    })
  };
  
  const [name, setName] = useState(true);
  const [rate, setRate] = useState(0);
  const [lotArea, setlotArea] = useState([0, 0]);
  const [furnishType, setFurnishType] = useState("");
  const [curfew, setCurfew] = useState(0);
  const [lotType, setlotType] = useState("");
  const [occupy, setOccupy] = useState(0);
  const [minStay, setMinStay] = useState("");
  const [inclusion, setInclusion] = useState("");

  return (
    <ChakraProvider theme={Theme}>
      <Container minW="90%" mt="10">
        <Heading mb="3">
          <Input
            placeholder="Enter Property Name"
            _placeholder={{ opacity: 0.4, fontWeight: "medium" }}
            focusBorderColor="upd.800"
            color="upd.800"
            fontWeight="Bold"
            maxW="50vh"
          />
        </Heading>

        <Box
          borderRadius="lg"
          boxShadow="0 0 10px 5px #dbdbdb"
          bgColor="white"
          p="5"
        >
          <Box borderRadius="lg" bgColor="gray.100" p="5">
            <Stack alignItems="center" textAlign="center">
              <Icon icon="bx:image-add" height="150px" color="#A0AEC0" />
              <Text fontWeight="bold" color="#A0AEC0" fontSize="sm">
                Click to upload property pictures (maximum of 10)
              </Text>
            </Stack>
          </Box>

          <Container
            as={Stack}
            p="0"
            mt="5"
            ml="0"
            justifyContent="left"
            alignItems="flexStart"
            maxWidth="100%"
            maxH="100%"
          >
            <SimpleGrid
              templateColumns={{ lg: "1fr 1fr", sm: "1fr" }}
              spacing={35}
              h="100%"
            >
              <Stack>
                <Box pb="5">
                  <Heading fontSize="25">Address</Heading>
                  <Input
                    placeholder="Unit No., Street Address., etc."
                    variant="flushed"
                    maxW={{ lg: "80%", sm: "100%" }}
                  />
                  <Input
                    placeholder="Municipality/Barangay"
                    variant="flushed"
                    maxW={{ lg: "80%", sm: "100%" }}
                  />
                  <Input
                    placeholder="City"
                    variant="flushed"
                    maxW={{ lg: "80%", sm: "100%" }}
                  />
                </Box>
                <Box pb="5">
                  <Heading fontSize="25">Rate</Heading>
                  <Input
                    placeholder="Amount in Peso (₱)"
                    variant="flushed"
                    maxW={{ lg: "80%", sm: "100%" }}
                  />
                </Box>
                <Box pb="5">
                  <Heading fontSize="25">Lot Area</Heading>
                  <Input
                    placeholder="Size in square meters (sq. m)"
                    variant="flushed"
                    maxW={{ lg: "80%", sm: "100%" }}
                  />
                </Box>
                <Box pb="5">
                  <Heading fontSize="25" mb="3">
                    Lot Type
                  </Heading>
                  <RadioGroup
                    pl="3"
                    colorScheme="upd"
                    onChange={(v) => {
                      setMinStay(v);
                    }}
                    value={minStay}
                  >
                    <Stack ml="-2" mt="2" direction={["column"]}>
                      <Radio value="0">Condominium</Radio>
                      <Radio value="1">Dormitory</Radio>
                      <Radio value="2">Apartment</Radio>
                      <Radio value="3">Boarding House</Radio>
                    </Stack>
                  </RadioGroup>
                </Box>
                <Box pb="5">
                  <Heading fontSize="25" mb="3">
                    Minimum Stay
                  </Heading>
                  <RadioGroup
                    pl="3"
                    colorScheme="upd"
                    onChange={(v) => {
                      setMinStay(v);
                    }}
                    value={minStay}
                  >
                    <Stack ml="-2" mt="2" direction={["column"]}>
                      <Radio value="0">1 - 5 months</Radio>
                      <Radio value="1">6 - 11 months</Radio>
                      <Radio value="2">12 months or more</Radio>
                    </Stack>
                  </RadioGroup>
                </Box>
                <Box pb="5">
                  <Heading fontSize="25">No. of Bedrooms</Heading>
                  <Input
                    placeholder="Specify number of bedrooms"
                    variant="flushed"
                    maxW={{ lg: "80%", sm: "100%" }}
                  />
                </Box>
                <Box pb="5">
                  <Heading fontSize="25">No. of Bathrooms</Heading>
                  <Input
                    placeholder="Specify number of bathrooms"
                    variant="flushed"
                    maxW={{ lg: "80%", sm: "100%" }}
                  />
                </Box>
              </Stack>
              <Stack>
              <Box pb="5">
                  <Heading fontSize="25">Occupancy</Heading>
                  <Input
                    placeholder="No. of occupants"
                    variant="flushed"
                    maxW={{ lg: "80%", sm: "100%" }}
                  />
                </Box>
                <Box pb="5">
                  <Heading fontSize="25" mb="3">
                    Furnishing
                  </Heading>
                  <RadioGroup
                    pl="3"
                    colorScheme="upd"
                    onChange={(v) => {
                      setMinStay(v);
                    }}
                    value={minStay}
                  >
                    <Stack ml="-2" mt="2" direction={["column"]}>
                      <Radio value="0">Full</Radio>
                      <Radio value="1">Semi</Radio>
                      <Radio value="2">None</Radio>
                    </Stack>
                  </RadioGroup>
                </Box>
                <Box pb="5">
                  <Heading fontSize="25" mb="3">
                    With Curfew
                  </Heading>
                  <RadioGroup
                    pl="3"
                    colorScheme="upd"
                    onChange={(v) => {
                      setMinStay(v);
                    }}
                    value={minStay}
                  >
                    <Stack ml="-2" mt="2" direction={["column"]}>
                      <Radio value="0">Yes</Radio>
                      <Radio value="1">No</Radio>
                    </Stack>
                  </RadioGroup>
                </Box>
                <Box pb="5">
                  <Heading fontSize="25" mb="3">
                    Rent Inclusion and Ameneties
                  </Heading>
                  <RadioGroup
                    pl="3"
                    colorScheme="upd"
                    onChange={(v) => {
                      setMinStay(v);
                    }}
                    value={minStay}
                  >
                    <Stack ml="-2" mt="2" direction={["column"]}>
                      <Radio value="0">Electricity</Radio>
                      <Radio value="1">Water</Radio>
                      <Radio value="2">Own Wifi</Radio>
                      <Radio value="3">Own Kitchen Area</Radio>
                      <Radio value="4">Parking Area</Radio>
                    </Stack>
                  </RadioGroup>
                </Box>
                <Box pb="5" w='95%'>
                  <Heading fontSize="25" mb="3">
                    Additional Details
                  </Heading>
                    <Textarea placeholder='Input additional details' maxWidth='100%'/>
                </Box>
              </Stack>
              
            </SimpleGrid>
          </Container>
        </Box>
        <Button onClick={logout}>Logout</Button>
      </Container>
    </ChakraProvider>
  );
};
