import { Routes, Route } from "react-router-dom";
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
import Register from "./pages/Landlord/LandlordRegistration";
import Login from "./pages/Landlord/LandlordLogin";
import Theme from "./components/Theme";
import { CreateProperty } from "./pages/Landlord/LandlordCreateProperty";
import Landing from "./pages/Landing";
import Partners from "./pages/Partners";
import { Help } from "./pages/Help";
import { AuthProvider } from "./utils/Auth";
import { RequireAuth } from "./utils/RequireAuth";
import ListedProperties from "./pages/Landlord/ListedProperties";
import SidebarWithHeader from "./components/Landlord/Sidebar";

const App = () => {
  return (
    <AuthProvider>
      <ChakraProvider theme={Theme}>
        <Container maxW="80%" minH="150vh">
          <Routes>
            <Route element={<Navbar />}>
              <Route index element={<Landing />} />
              <Route path="/LandlordLogin" element={<Login />} />
              <Route
                path="/LandlordRegister"
                element={<Register />}
              />
              <Route path="/Home" element={<Home />} />
              <Route path="/AboutUs" element={<About />} />
              <Route path="/Faqs" element={<Faqs />} />
              <Route path="/:id" element={<Properties />} />
              <Route path="/Partners" element={<Partners />} />
              <Route path="/Help" element={<Help />} />
              <Route path="/Terms" element={<TermsofService />} />
              <Route path="/Privacy" element={<Privacy />} />
              <Route path="/ContactUs" element={<ContactUs />} />
              <Route path="/PostingGuides" element={<PostingGuides />} />
              <Route path="/SearchGuides" element={<SearchGuides />} />
              <Route path="/Safety" element={<Safety />} />
            </Route>
            <Route element={<RequireAuth />}>
              <SidebarWithHeader>
                <Route
                  path="/Landlord/ListedProperties"
                  element={<ListedProperties />}
                />
                <Route
                  path="/Landlord/CreateProperty"
                  element={<CreateProperty />}
                />
              </SidebarWithHeader>
            </Route>
          </Routes>
        </Container>
        <Footer />
      </ChakraProvider>
    </AuthProvider>
  );
};

export default App;
