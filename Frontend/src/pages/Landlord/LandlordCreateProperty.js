import {
  Box,
  ChakraProvider,
  Checkbox,
  CheckboxGroup,
  Container,
  FormControl,
  Heading,
  Input,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  Button,
} from "@chakra-ui/react";
import Theme from "../../components/Theme.js";
import { Icon } from "@iconify/react";
import { fetchAuth } from "../../utils/FetchAuth";
import Axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
Axios.defaults.withCredentials = true;

export const CreateProperty = () => {
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      pname: "",
      add: "",
      brgy: "",
      city: "",
      area: "",
      rate: "",
      type: "",
      bed: "",
      bath: "",
      minstay: "",
      occupancy: "",
      curfew: "",
      inclusion: [],
      other: "",
      //img: "",
    },
    validationSchema: Yup.object({
      pname: Yup.string()
        .max(20, "Must be 40 characters or less")
        .required("Required"),
      add: Yup.string()
        .max(40, "Must be 25 characters or less")
        .required("Required"),
      city: Yup.string()
        .max(40, "Must be 25 characters or less")
        .required("Required"),
      area: Yup.number("Input must be a number")
        .required("Required")
        .positive(),
      rate: Yup.number()
        .required("Required")
        .positive("Input must be a positive number"),
      type: Yup.string().required("Required"),
      minstay: Yup.string().required("Required"),
      bed: Yup.number()
        .required("Required")
        .positive("Input must be a positive number"),
      bath: Yup.number()
        .required("Required")
        .integer()
        .positive("Input must be a positive integer"),
      occupancy: Yup.number().required("Required"),
      furnishing: Yup.number().required("Required"),
      curfew: Yup.number().required("Required"),
      inclusion: Yup.number().required("Required"),
      other: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      await Axios.post(`${fetchAuth}/api/listing/create`, values, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  console.log(formik.errors);
  console.log(formik.values);

  return (
    <ChakraProvider theme={Theme}>
      <Container minW="90%" mt="10">
        <form onSubmit={formik.handleSubmit}>
          <Heading mb="3">
            <FormControl id="pname">
              <Input
                placeholder="Enter Property Name"
                _placeholder={{ opacity: 0.4, fontWeight: "medium" }}
                focusBorderColor="upd.800"
                color="upd.800"
                fontWeight="Bold"
                maxW="50vh"
                onChange={formik.handleChange}
                value={formik.values.pname}
              />
            </FormControl>
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
                    <FormControl id="add">
                      <Input
                        placeholder="Unit No., Street Address., etc."
                        variant="flushed"
                        maxW={{ lg: "80%", sm: "100%" }}
                        onChange={formik.handleChange}
                        value={formik.values.add}
                      />
                    </FormControl>
                    <FormControl id="brgy">
                      <Input
                        placeholder="Municipality/Barangay"
                        variant="flushed"
                        maxW={{ lg: "80%", sm: "100%" }}
                        onChange={formik.handleChange}
                        value={formik.values.brgy}
                      />
                    </FormControl>
                    <FormControl id="city">
                      <Input
                        placeholder="City"
                        variant="flushed"
                        maxW={{ lg: "80%", sm: "100%" }}
                        onChange={formik.handleChange}
                        value={formik.values.city}
                      />
                    </FormControl>
                  </Box>
                  <Box pb="5">
                    <Heading fontSize="25">Rate</Heading>
                    <FormControl id="rate">
                      <Input
                        placeholder="Amount in Peso (₱)"
                        variant="flushed"
                        maxW={{ lg: "80%", sm: "100%" }}
                        onChange={formik.handleChange}
                        value={formik.values.rate}
                      />
                    </FormControl>
                  </Box>
                  <Box pb="5">
                    <Heading fontSize="25">Lot Area</Heading>
                    <FormControl id="area">
                      <Input
                        placeholder="Size in square meters (sq. m)"
                        variant="flushed"
                        maxW={{ lg: "80%", sm: "100%" }}
                        onChange={formik.handleChange}
                        value={formik.values.area}
                      />
                    </FormControl>
                  </Box>
                  <Box pb="5">
                    <Heading fontSize="25" mb="3">
                      Lot Type
                    </Heading>
                    <FormControl name="type">
                      <RadioGroup
                        pl="3"
                        colorScheme="upd"
                        onChange={(value) => formik.handleChange("type")(value)}
                        value={formik.values.type}
                      >
                        <Stack ml="-2" mt="2" direction={["column"]}>
                          <Radio value="0">Condominium</Radio>
                          <Radio value="1">Dormitory</Radio>
                          <Radio value="2">Apartment</Radio>
                          <Radio value="3">Boarding House</Radio>
                        </Stack>
                      </RadioGroup>
                    </FormControl>
                  </Box>
                  <Box pb="5">
                    <Heading fontSize="25" mb="3">
                      Minimum Stay
                    </Heading>
                    <FormControl name="minstay">
                      <RadioGroup
                        pl="3"
                        colorScheme="upd"
                        onChange={(value) =>
                          formik.handleChange("minstay")(value)
                        }
                        value={formik.values.minstay}
                      >
                        <Stack ml="-2" mt="2" direction={["column"]}>
                          <Radio value="0">1 - 5 months</Radio>
                          <Radio value="1">6 - 11 months</Radio>
                          <Radio value="2">12 months or more</Radio>
                        </Stack>
                      </RadioGroup>
                    </FormControl>
                  </Box>
                  <Box pb="5">
                    <Heading fontSize="25">No. of Bedrooms</Heading>
                    <FormControl id="bed">
                      <Input
                        placeholder="Specify number of bedrooms"
                        variant="flushed"
                        maxW={{ lg: "80%", sm: "100%" }}
                        onChange={formik.handleChange}
                        value={formik.values.bed}
                      />
                    </FormControl>
                  </Box>
                  <Box pb="5">
                    <Heading fontSize="25">No. of Bathrooms</Heading>
                    <FormControl id="bath">
                      <Input
                        placeholder="Specify number of bathrooms"
                        variant="flushed"
                        maxW={{ lg: "80%", sm: "100%" }}
                        onChange={formik.handleChange}
                        value={formik.values.bath}
                      />
                    </FormControl>
                  </Box>
                </Stack>
                <Stack>
                  <Box pb="5">
                    <Heading fontSize="25">Occupancy</Heading>
                    <FormControl id="occupancy">
                      <Input
                        placeholder="No. of occupants"
                        variant="flushed"
                        maxW={{ lg: "80%", sm: "100%" }}
                        onChange={formik.handleChange}
                        value={formik.values.occupancy}
                      />
                    </FormControl>
                  </Box>
                  <Box pb="5">
                    <Heading fontSize="25" mb="3">
                      Furnishing
                    </Heading>
                    <FormControl name="furnishing">
                      <RadioGroup
                        pl="3"
                        colorScheme="upd"
                        onChange={(value) =>
                          formik.handleChange("furnishing")(value)
                        }
                        value={formik.values.furnishing}
                      >
                        <Stack ml="-2" mt="2" direction={["column"]}>
                          <Radio value="0">Full</Radio>
                          <Radio value="1">Semi</Radio>
                          <Radio value="2">None</Radio>
                        </Stack>
                      </RadioGroup>
                    </FormControl>
                  </Box>
                  <Box pb="5">
                    <Heading fontSize="25" mb="3">
                      With Curfew
                    </Heading>
                    <FormControl name="curfew">
                      <RadioGroup
                        pl="3"
                        colorScheme="upd"
                        onChange={(value) =>
                          formik.handleChange("curfew")(value)
                        }
                        value={formik.values.curfew}
                      >
                        <Stack ml="-2" mt="2" direction={["column"]}>
                          <Radio value="0">Yes</Radio>
                          <Radio value="1">No</Radio>
                        </Stack>
                      </RadioGroup>
                    </FormControl>
                  </Box>
                  <Box pb="5">
                    <Heading fontSize="25" mb="3">
                      Rent Inclusion and Amenities
                    </Heading>
                    <FormControl name="inclusion">
                      <CheckboxGroup pl="3" colorScheme="upd">
                        <Stack ml="1" mt="2" direction={["column"]}>
                          <Checkbox value="0" onChange={formik.handleChange}>
                            Electricity
                          </Checkbox>
                          <Checkbox value="1" onChange={formik.handleChange}>
                            Water
                          </Checkbox>
                          <Checkbox value="2" onChange={formik.handleChange}>
                            Own Wifi
                          </Checkbox>
                          <Checkbox value="3" onChange={formik.handleChange}>
                            Own Kitchen Area
                          </Checkbox>
                          <Checkbox value="4" onChange={formik.handleChange}>
                            Parking Area
                          </Checkbox>
                        </Stack>
                      </CheckboxGroup>
                    </FormControl>
                  </Box>
                  <Box pb="5" w="95%">
                    <Heading fontSize="25" mb="3">
                      Additional Details
                    </Heading>
                    <FormControl id="other">
                      <Textarea
                        placeholder="Input additional details"
                        maxWidth="100%"
                        onChange={formik.handleChange}
                        value={formik.values.other}
                      />
                    </FormControl>
                  </Box>
                  <Button
                    isLoading={isLoading}
                    maxW={{ sm: "100%", md: "7em" }}
                    loadingText="Submitting"
                    colorScheme="upd"
                    variant="solid"
                    spinnerPlacement="start"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Stack>
              </SimpleGrid>
            </Container>
          </Box>
        </form>
      </Container>
    </ChakraProvider>
  );
};
