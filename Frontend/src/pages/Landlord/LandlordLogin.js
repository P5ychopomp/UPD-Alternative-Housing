import {
  Box,
  Button,
  ChakraProvider,
  Container,
  Grid,
  GridItem,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import Theme from "../../components/Theme";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const LandlordLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <ChakraProvider theme={Theme}>
      <Container mt="100" minW="100%" alignItems="center" centerContent>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"} color="upd.700">
            Welcome Landlord and Landladies!
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Help an Isko/Iska by listing your space on our website today. 🏠
          </Text>
        </Stack>
        <Stack>
          <Heading mt='20' mb='2'fontSize={"4xl"} color="upd.700">
            Login
          </Heading>

          <Box
            borderRadius="lg"
            overflow="hidden"
            boxShadow="0px 0px 15px 1px #dbdbdb"
            padding="5"
            minW="60%"
            
          >
            <Grid
              templateRows="repeat(7, 1fr)"
              templateColumns="repeat(10, 1fr)"
              gap={5}
            >
              <GridItem rowSpan={1} colSpan={10}></GridItem>

              <GridItem rowSpan={7} colSpan={1}></GridItem>

              <GridItem rowSpan={5} colSpan={4}>
                <Image
                  boxSize="300px"
                  objectFit="cover"
                  borderRadius="lg"
                  src="landlord-image-1.png"
                  alt="Landlord Icon"
                />
              </GridItem>

              <GridItem colSpan={4} rowSpan={1}></GridItem>

              <GridItem colSpan={4} rowSpan={1}>
                <Input placeholder="Email" size="lg" />
              </GridItem>
              <GridItem colSpan={4} rowSpan={1}>
                <InputGroup size="lg">
                  <Input
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                  />
                  <InputRightElement p="1">
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </GridItem>

              <GridItem colSpan={4} rowSpan={1}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"upd.400"}
                  color={"white"}
                  _hover={{
                    bg: "upd.700",
                  }}
                >
                  Log in
                </Button>
              </GridItem>
              <GridItem colSpan={4} rowSpan={1}>
                <Text>
                  Don't have an account?{" "}
                  <Link as={ReactLink} to="/LandlordRegister" color={"upd.400"}>
                    Sign up
                  </Link>
                </Text>
              </GridItem>

              <GridItem rowSpan={1} colSpan={10}></GridItem>
            </Grid>
          </Box>
        </Stack>
      </Container>
    </ChakraProvider>
  );
};

export default LandlordLogin;
