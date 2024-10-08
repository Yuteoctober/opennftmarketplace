import beach from './assets/beach_chair.png'
import loading from './assets/loadpen.gif'
import { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {Routes, Route} from 'react-router-dom'
import Cart from './components/Cart';
import UserContext  from './UserContext';
import Bg from './components/Bg';
import Nav from './components/Nav';
import ProjectPic from './components/ProjectPic';
import Search from './components/Search';
import Live from './components/Live';
import Nft from './components/Nft';
import Charts from './components/Chart';
import Itemdetail from './components/Itemdetail';
import { TypeAnimation } from 'react-type-animation';




function App() {
    const [prevSortedData, setPrevSortedData] = useState([]);
    const [optionTxt, setOptionTxt] = useState('Sort');
    const [optionFilter, setOptionFilter] = useState(false);
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
    const [screenLoading, setScreenLoading] = useState(true);


    // function add buy to cart 
    const addToCart = (nft) => {
      
      if (
        cartItem &&
        cartItem.some((item) => item.nft.name === nft.nft.name)
      ) {
        alert(`Item is already in your cart.`);
        return;
      }
  
      const updatedCart = [...cartItem, nft];
      setCartItem(updatedCart);
      alert(`Item has been added in your cart.`)
  
  };

      // Function to fetch the current visitor count
      function fetchVisitorCount() {
        axios.get(`https://notebackend2.onrender.com/visit/getcount/opennft`, {
        })
        .then((response) => {
            const result = response.data.visit; 
            updateVisitorCount(result);
        })
        .catch(err => console.log('Error fetching visitor count:', err));
      }

      // Function to update the visitor count
      function updateVisitorCount(result) {
        const updatecount = result + 1
        axios.put(`https://notebackend2.onrender.com/visit/updatecount/opennft`, { num: updatecount }, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then(() => {
            console.log(`Visitor count: ${result}`);
        })
        .catch(err => console.log('Error updating visitor count:', err));
      }


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

    useEffect(() => {
        fetchData();
        fetchVisitorCount();
    }, []);

    const fetchData = async () => {
        try {
          const promises = [];
          for (let index = 1; index <= 24; index++) {
            const id = Math.floor(Math.random() * 8888);
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
          
            loadingTimeout()
          
            
        } catch (error) {
            console.log('Error fetching images: ' + error.message);
        }
    };

          function loadingTimeout() {
            setTimeout(() => {
                if (!nftData) {
                    loadingTimeout();
                } else {
                    setScreenLoading(false);
                }
            }, 2000);
        }

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
      optionFilter, setOptionFilter,
      optionTxt, setOptionTxt,
      prevSortedData, setPrevSortedData,
      addToCart,
    }

    

    if (screenLoading) {
      return (
          <section className='screen_loading'>
            <div className='loading_container'>
              <img src={loading} alt="loading" className='pen_guitar' />
              <img src={beach} alt="beach" className='beach' />
              <h1>
                <TypeAnimation
                  sequence={['Loading.....', 1200,'Loading', 1000]}
                  style={{ fontSize: '25px', border: 'none', letterSpacing: '.3rem'}}
                  repeat={Infinity}
                />
              </h1>
            </div>
          </section>
      )
    }


  return (
    <UserContext.Provider value={contextValue}>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path='/items/:rank' element={<Itemdetail />}/>
      </Routes>
    </UserContext.Provider>
  )
}


function Home() {

  return (
      <section>
        <Bg />
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