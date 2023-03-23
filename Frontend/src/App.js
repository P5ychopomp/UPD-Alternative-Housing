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
import { ChakraProvider, Container } from "@chakra-ui/react";
import LandlordRegistration from "./pages/Landlord/LandlordRegistration";
import LandlordLogin from "./pages/Landlord/LandlordLogin";
import Theme from "./components/Theme";
import { LandlordCreateProperty } from "./pages/Landlord/LandlordCreateProperty";
import Landing from "./pages/Landing";

const App = () => {
  return (
    <ChakraProvider theme={Theme}>
      <Container maxW='100%' m='0' p='0' minH='150vh'>
      <Routes>
        <Route element={<Navbar />}>
          <Route index element={<Landing />} />
          <Route path="/LandlordLogin" element={<LandlordLogin />} />
          <Route path="/LandlordRegister" element={<LandlordRegistration />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/AboutUs" element={<About />} />
          <Route path="/Faqs" element={<Faqs />} />
          <Route path="/:id" element={<Properties />} />
          <Route path="/Terms" element={<TermsofService />} />
          <Route path="/Privacy" element={<Privacy />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/PostingGuides" element={<PostingGuides />} />
          <Route path="/SearchGuides" element={<SearchGuides />} />
          <Route path="/Safety" element={<Safety />} />
        </Route>
        <Route path="/CreateProperty" element={<LandlordCreateProperty />} />
      </Routes>
      </Container>
      
      <Footer />
    </ChakraProvider>
  );
};

export default App;
