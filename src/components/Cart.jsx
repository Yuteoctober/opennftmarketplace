import { useContext } from "react";
import UseContext from "../UserContext";
import { BsXLg } from "react-icons/bs";
import dance from '../assets/dance.gif';
import stop from '../assets/stop.png'
import road from '../assets/road.png'
import { FaHouseChimney } from "react-icons/fa6";
import { Link } from 'react-router-dom';


function Cart() {
  const { cartItem, setCartItem } = useContext(UseContext);

  function deleteItem(id, index) {
    if (cartItem[index].nft.identifier === id) {
      const updatedCart = cartItem.filter((_, idx) => idx !== index);
      setCartItem(updatedCart);
    }
  }

  return (
    <section className='cart_page'>
      {cartItem.length <= 0 ? (
        <>
          <div className="dance_gif">
            <img src={dance} alt="dance" />
          </div>
          <div className="stop">
            <img src={stop} alt="stop" className="cart_stop" />
            <h4>Empty <br />cart</h4>
          </div>
          <img src={road} alt="road" className="cart_road" />
          <div className="back_home">
              <Link to="/" style={{color: 'inherit', textDecoration: 'none'}} >
                  <h3>
                    Back to homepage 
                    <span>
                      <FaHouseChimney />
                    </span>
                  </h3>
              </Link> 
          </div>
        </>
      ) : (
        <div className="cart_container">
          <h3>Shopping Cart</h3>
          {cartItem.map((nft, index) => (
          <>
            <div className="cart_item" key={index}>
              <div className="cart_img">
                <img src={nft.nft.image_url} alt="NFT" />
              </div>
              <div className="cart_des">
                <h4>{nft.nft.name}</h4>
                <p>Rank: {nft.nft.rarity.rank}</p>
              </div>
              <div className="cart_item_number">
                <h4>1</h4>
              </div>
              <div
                className="cart_x"
                onClick={() => deleteItem(nft.nft.identifier, index)}
              >
                <span><BsXLg/></span>
              </div>
            </div>
            <div className="cart_line"></div>
          </>
          ))}
          
          <button className='btn_checkout'>Checkout</button>
        </div>
      )}
    </section>
  );
}

export default Cart;
