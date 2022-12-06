import { useState, useEffect } from 'react'
import { BrowserRouter as Router} from 'react-router-dom'
import Navbar from './components/Navbar'
import Listings from './components/Listings'
import Search from './components/Search'
import Footer from './components/Footer';
import './App.css';

function App() {
  const [properties, setListings] = useState([])

  useEffect(() => {
    const getListings = async () => {
      const FromServer = await fetchListings()
      setListings(FromServer)
    }
    getListings()
  }, [])

  const fetchListings = async () => {
    const res = await fetch('http://192.168.68.104:8080/api/listings')
    const data = await res.json()
    return data
  }

    return (
      <Router>
      <Navbar />
      <div className='container'>
        <Search />
        <Listings properties={properties} />

      </div>
      <Footer />
    </Router>
      
    );
}

export default App;
