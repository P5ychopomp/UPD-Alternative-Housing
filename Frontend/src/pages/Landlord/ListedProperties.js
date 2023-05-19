import {
  ChakraProvider,
  Box,
  Image,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";

const ListedProperties = ({ property }) => {
  return (
    <ChakraProvider>
      <Box mt="20" alignItems="center" centerContent>
        <TableContainer>
          <Table variant="simple" size="lg">
            <Thead>
              <Tr>
                <Th></Th>
                <Th>Image</Th>
                <Th>Title</Th>
                <Th>Date Added</Th>
                <Th>ID</Th>
                <Th>Address</Th>
                <Th>Remove</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <input type="checkbox" id="select" />
                </Td>
                <Td>
                  {" "}
                  <Image
                    boxSize="50px"
                    borderRadius="full"
                    src={"landlord.png"}
                    objectFit="cover"
                    alt="Landlord Profile Picture"
                  />{" "}
                </Td>
                <Td>Title</Td>
                <Td>Date Added</Td>
                <Td>ID</Td>
                <Td>Address</Td>
                <Td>
                  <Button>Danger</Button>
                </Td>
                <Td>
                  <Button>...</Button>
                </Td>
              </Tr>
            </Tbody>
            <Tfoot>
              <Tr>
                <Td>
                  {" "}
                  <Button> + Add New Property</Button>
                </Td>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
    </ChakraProvider>
  );
};

export default ListedProperties;
