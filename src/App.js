import { useState, useEffect } from 'react'
import { BrowserRouter as Router} from 'react-router-dom'
import Header from './components/Header'
import Listings from './components/Listings'
import Search from './components/Search'

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
      <div className='container'>
        <Header />
        <Search />
        <Listings properties={properties} />

      </div>
    </Router>
      
    );
}

export default App;
