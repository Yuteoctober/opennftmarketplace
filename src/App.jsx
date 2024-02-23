import { useState, useEffect, useContext} from 'react';
import UseContext from './UserContext'
import axios from 'axios';
import {Routes, Route} from 'react-router-dom'
import Cart from './components/Cart';
import UserContext  from './UserContext';
import Nav from './components/Nav';
import ProjectPic from './components/ProjectPic';
import Search from './components/Search';
import Live from './components/Live';
import Nft from './components/Nft';
import Charts from './components/Chart';



function App() {
    const [mobileSandwich, setMobileSandwich] = useState(false);
    const [dropHidden, setDropHidden] = useState(false);
    const [statHidden, setStatHidden] = useState(false);
    const [sortWin, setSortWin] = useState(false);
    const [inputVal, setInputVal] = useState('');
    const [expand, setExpand] = useState(false);
    const [filterByInput, setFilterByInput] = useState(false);
    const [item, setItem] = useState(true);
    const [activity, setActivity] = useState(false);
    const [nftData, setNftData] = useState([]);
    const [drops, setDrops] = useState(false);
    const [stats, setStats] = useState(false);
    const [webHover, setWebHover] = useState(false);
    const [xHover, setXHover] = useState(false);
    const [filteredNftData, setFilteredNftData] = useState([]);
    const [ethStates, setEthStates] = useState(Array(nftData.length).fill(false));
    const [buy, setBuy] = useState(Array(nftData.length).fill(false));
    const [cartItem, setCartItem] = useState([]);
    const [defaultNft, setDefaultNft] = useState([]);
    const [scrollPosition, setScrollPosition] = useState(0);


    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };
    
    useEffect(() => {
      window.addEventListener('scroll', handleScroll, true);
    
      return () => {
          window.removeEventListener('scroll', handleScroll, true);
      };
  }, []);


    const apiKey = '8cefdeec8c404d5ca4c2b27360b19dc2';
    const contract = '0xBd3531dA5CF5857e7CfAA92426877b022e612cf8';
    const numIds = 24;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
          const promises = [];
          for (let index = 0; index < numIds; index++) {
              const id = index * Math.floor(Math.random()*87) + Math.floor(Math.random() + 1);
              const apiUrl = `https://api.opensea.io/api/v2/chain/ethereum/contract/${contract}/nfts/${id}`;
              promises.push(axios.get(apiUrl, {
                  headers: {
                      'X-API-KEY': apiKey,
                      'Content-Type': 'application/json',
                  },
              }));
          }

            const responses = await Promise.all(promises);

            const imageData = responses.map(response => response.data);

            setNftData(imageData.filter(data => data.nft && data.nft.image_url));

            // copy nft array
            setDefaultNft(imageData.filter(data => data.nft && data.nft.image_url))
     
        } catch (error) {
            console.log('Error fetching images: ' + error.message);
        }
    };

    const contextValue = {
      mobileSandwich, setMobileSandwich,
      dropHidden, setDropHidden,
      statHidden, setStatHidden,
      drops, setDrops,
      stats, setStats,
      expand, setExpand,
      item, setItem,
      activity, setActivity,
      webHover, setWebHover,
      xHover, setXHover,
      sortWin, setSortWin,
      inputVal, setInputVal,
      filterByInput, setFilterByInput,
      filteredNftData, setFilteredNftData,
      fetchData,
      nftData, setNftData,
      ethStates, setEthStates, 
      buy, setBuy,
      cartItem, setCartItem,
      defaultNft, setDefaultNft,
      scrollPosition, setScrollPosition,
    }

  return (
    <UserContext.Provider value={contextValue}>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/cart' element={<Cart />}/>
      </Routes>
    </UserContext.Provider>
  )
}


function Home() {

  const {mobileSandwich} = useContext(UseContext);

  return (
      <section style={{height: mobileSandwich? '100%':''}} >
        <Nav />
        <ProjectPic />
        <Search />
        <Live />
        <Nft />
        <Charts />
      </section>
  )
}

export default App