import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  ChakraProvider,
  Divider,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as ReactLink } from "next/link";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Theme from "../../components/Theme";
import Layout from "@/components/Layout";

export default function LandlordRegister() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <ChakraProvider theme={Theme}>
      <Layout>
        <Flex mt="10" align={"center"} justify={"center"}>
          <Stack spacing={8} mx={"auto"} minW={"50%"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"} textAlign={"center"} color="upd.700">
                Registration
              </Heading>
              <Text fontSize={"lg"} color={"gray.600"}>
                Rent your place with just a few requirements 👌
              </Text>
            </Stack>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow="0px 0px 15px 1px #dbdbdb"
              p={8}
            >
              <Stack spacing={4}>
                <HStack maxWidth={"100%"}>
                  <Box minW={"50%"}>
                    <FormControl name="fname" id="firstName" isRequired>
                      <FormLabel>First Name</FormLabel>
                      <Input type="text" />
                    </FormControl>
                  </Box>
                  <Box minW={"50%"}>
                    <FormControl name="=lname" id="lastName" isRequired>
                      <FormLabel>Last Name</FormLabel>
                      <Input type="text" />
                    </FormControl>
                  </Box>
                </HStack>
                <FormControl name="email" id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input type={showPassword ? "text" : "password"} />
                    <InputRightElement width="3.5rem">
                      <Button
                        h="2rem"
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <Text
                    mt="1"
                    maxW="100%"
                    fontWeight="medium"
                    fontSize="11"
                    color="gray"
                  >
                    Password must be 6 characters long and must contain at least
                    1 special character and number.
                  </Text>
                </FormControl>
                <FormControl id="confirmPassword" isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <InputGroup>
                    <Input type={"password"} />
                  </InputGroup>
                </FormControl>
              </Stack>
              <Stack spacing={4}>
                <Divider
                  mt="7"
                  mb="2"
                  borderColor="gray.400"
                  variant="dashed"
                />
                <FormControl id="facebook" isRequired>
                  <FormLabel>Facebook Profile</FormLabel>
                  <Input type="text" />
                </FormControl>
                <FormControl name="phone" id="phone" isRequired>
                  <FormLabel>Phone Number</FormLabel>
                  <Input type="text" />
                </FormControl>
                <HStack spacing={10} pt={2} justifyContent="center">
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={"upd.400"}
                    color={"white"}
                    _hover={{
                      bg: "upd.700",
                    }}
                  >
                    Sign up
                  </Button>
                </HStack>
                <Stack pt={6}>
                  <Text align={"center"}>
                    Already a user?{" "}
                    <Link as={ReactLink} to="/LandlordLogin" color={"upd.400"}>
                      Login
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </Layout>
    </ChakraProvider>
  );
}
