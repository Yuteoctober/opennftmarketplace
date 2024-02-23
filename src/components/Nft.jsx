import React from 'react';
import { useContext } from "react";
import UseContext from '../UserContext'
import { motion } from "framer-motion"
import ETH from '../assets/Ethereum-Icon-Purple-Logo.wine.svg'

export default function Nft() {

    const {
        ethStates, setEthStates, 
        buy, setBuy,
        activity, 
        filterByInput, 
        filteredNftData, 
        nftData, 
        cartItem, setCartItem
      } = useContext(UseContext);


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

    // Function to toggle buy button
    const toggleBuy = (index) => {
        const newBuyBtn = buy.map(() => false);
        newBuyBtn[index] = !newBuyBtn[index];
        setBuy(newBuyBtn);
    };
  
      // Function make all Buy btn disappear
      const toggleAllBuyFalse = () => {
        const closeAllBuy = buy.map(() => false);
        setBuy(closeAllBuy);
      }
  
      // Function to toggle eth state for a specific index
      const toggleEthState = (index) => {
          const newEthStates = ethStates.map(() => false);
          newEthStates[index] = !newEthStates[index];
          setEthStates(newEthStates);
      };
      
  
      // Function make all ETH disappear
      const toggleEthStateAllFalse = () => {
        const closeAllETH = ethStates.map(() => false);
        setEthStates(closeAllETH);
      }

  return (
    <>
        {activity?
        (
          null
        )
        :
        (
          <motion.div className="nft_img">
          { nftData.length > 0 && (filterByInput ? filteredNftData : nftData).map((nft, index) => (
            <React.Fragment key={index}>
              <motion.div className='img_container' 
                whileTap={() => {toggleEthState(index); toggleBuy(index)}}
                onHoverStart={() => {toggleEthState(index); toggleBuy(index)}}
                onHoverEnd={() => {toggleEthStateAllFalse(); toggleAllBuyFalse()}}
                onTouchMoveCapture={() => {toggleEthStateAllFalse(); toggleAllBuyFalse()}}
              >
                {ethStates[index] && (
                  <motion.div className="eth_circle"
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1}}
                    transition={{ duration: 0.15, ease: 'easeInOut' }}
                  >
                    <img src={ETH} alt="logo" className='ETH_logo' />
                  </motion.div>
                )}
                <img src={nft.nft.image_url} alt={`NFT Image ${index}`} className='img_pudgy' />
                <div className='img_des_container'>
                  <h4>{nft.nft.name}</h4>
                  <h4>Rank: {nft.nft.rarity.rank}</h4>
                  <motion.h3
                    onClick={() => addToCart(nft)}
                    animate={{y: buy[index] ? 0 : 50, opacity: 1}}
                    whileTap={{background: '#ffffff00'}}
                    transition={{ type: 'spring', duration: 0.35 }}
                  >
                    Buy now
                  </motion.h3>
                </div>
              </motion.div>
            </React.Fragment>
          ))}
        </motion.div>
        )
        }
    </>
  )
}
