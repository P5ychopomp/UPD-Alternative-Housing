import { Box, ChakraProvider, Container, Text } from '@chakra-ui/react'

const Privacy = () => {
  return (
    <ChakraProvider>
      <Box m='20'>
      <Container mt='20' alignItems='center' centerContent>
      <Box mb='50' fontSize='28' fontWeight='bold' alignItems='center' >
        <h1>Privacy Policy</h1>
      </Box>
    </Container>
      <Box mb='10'>
        <Text as='b' fontSize={"2xl"} color={"gray.600"}>
          Data Privacy Act
        </Text>
        <p>
        The University Student Council (USC) Basic Student Services and the Development Team for the Alternative Housing Portal recognize its responsibilities under the Republic Act No. 10173 (Act), also known as the Data Privacy Act of 2012,
        with respect to the data we collect, record, organize, update, use, consolidate or destruct from the users of the website.
        The personal data obtained from this website is entered and stored within the official database of the Alternative Housing Portal and will only be accessed by
        the USC Basic Student Services and the Development team and have instituted appropriate organizational, technical and physical security measures to ensure the protection of the users' personal data.
        
        The USC Basic Student Services and the Development Team for the Alternative Housing Portal shall not disclose the users' personal information without their consent and shall retain this information for
        the effective implementation and management of the website. It is committed to comply with the Philippine Data Privacy Act of 2012 (DPA) in order to protect your right to data privacy.
        </p>
      </Box>
      <Box mb='10'>
      <Text as='b' fontSize={"2xl"} color={"gray.600"}>
        The data that we use.
      </Text>
        <p><b> Profile information of Landlords.</b> We collect the personal information of Landlords when they register an account.
        Their contact details are required so that their account can be verfied. The collected data are stored in the official website database
        and can only be accessed by the admins and the development team.
        </p>
        <br></br>
        <p> <b> Listing information of posts. </b> The specifications of each property is collected when the Landlords create a listing for posting.
        The collected data are stored in the official website database and can only be accessed by the admins and the development team.
        </p>
      </Box>
      <Box mb='10'>
      <Text as='b' fontSize={"2xl"} color={"gray.600"}>
        How we use information.
      </Text>
        <p><b> Property listing posts.</b> The collected and stored data from creating a property listing will be posted in a page.
        The contact details of the Landlord that made the post will also be shown in the listing page. These information are made public so
        that the users can view the specifications of the listing and contact the Landlords for inquiry.
        </p>
        <br></br>
        <p> <b> Landlord account and post management. </b> The database of the created accounts and posts of Landlords are accessible by an admin account which
        is controlled by the USC Basic Student Services and the Development team. The information of the accounts and listings are shown and can be managed
        in the page. The admin reserves the right to delete accounts and listings that are deemed unfit to be shown publicly to the users.
        </p>
      </Box>
      </Box>
    </ChakraProvider>
  )
}

export default Privacy