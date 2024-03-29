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
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Theme from "../../components/Theme";
import { fetchAuth } from "../../utils/FetchAuth";
import Axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function LandlordRegister() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      passwordconfirm: "",
/*       facebook: "",
      phone: "", */
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
        .max(40, "Must be 40 characters or less")
        .required("Required"),
      last_name: Yup.string()
        .max(25, "Must be 25 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
      passwordconfirm: Yup.string()
        .required("Required"),
      /* facebook: Yup.string().max("Invalid email address").required("Required"),
      phone: Yup.string().max("Invalid email address").required("Required"), */
    }),
    onSubmit: async (values) => {
      console.log(values);
      await Axios.post(`${fetchAuth}/register`, values, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then((response) => {
          if (response.status === 200) {
            navigate("/LandlordLogin");
          }
        })
        .catch((error) => {
            console.log(error.response);
        });
    },
  });

  console.log(formik.errors)

  return (
    <ChakraProvider theme={Theme}>
      <form onSubmit={formik.handleSubmit}>
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
                    <FormControl name="fname" id="first_name" isRequired>
                      <FormLabel>First Name</FormLabel>
                      <Input
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.first_name}
                      />
                    </FormControl>
                  </Box>
                  <Box minW={"50%"}>
                    <FormControl name="=lname" id="last_name" isRequired>
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.last_name}
                      />
                    </FormControl>
                  </Box>
                </HStack>
                <FormControl name="email" id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
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
                <FormControl id="passwordconfirm" isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <InputGroup>
                    <Input
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.passwordconfirm}
                    />
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
                  <Input
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.facebook}
                  />
                </FormControl>
                <FormControl name="phone" id="phone" isRequired>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                  />
                </FormControl>
                <HStack spacing={10} pt={2} justifyContent="center">
                  <Button
                    type="submit"
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
      </form>
    </ChakraProvider>
  );
}
