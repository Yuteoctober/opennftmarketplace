import { useParams } from 'react-router-dom';
import { useState,useContext } from "react";
import UseContext from '../UserContext'
import Nav from './Nav';
import { FcApproval } from 'react-icons/fc';
import { AiOutlineQq } from "react-icons/ai";
import { BsChevronRight, BsChevronDown } from "react-icons/bs";
import ETH from '../assets/Ethereum-Icon-Purple-Logo.wine.svg'

export default function ItemDetail() {

    const [traitHide, setTRadeHide] = useState(false)

    let { rank } = useParams();

    const { nftData, addToCart, cartItem } = useContext(UseContext);

      
    const matchedNft = nftData.find(nft => nft.nft.rarity.rank === parseInt(rank))
    console.log(matchedNft)

    if (!matchedNft){
        return (
            <h2 style={{color:'white', padding: '1rem'}}>NFT not found</h2>
        )
    }
   

    return (
        <section className='item_detail_section'>
            <Nav/>
            <div className="item_detail_name_container">
                <h3>Pudgy Penguins <span><FcApproval /></span></h3>
                <h1>{matchedNft.nft.name}</h1>
                <h2>Rank: #{matchedNft.nft.rarity.rank}</h2>
            </div>

            <div className="item_detail_container">

                <div className="item_detail_img_container">
                    <div className="item_detail_img_nav">
                        <img src={ETH} alt="ETH" className='item_detail_ETH' />
                    </div>
                    <div className="item_detail_img">
                        <img className='item_detail_img' src={matchedNft.nft.image_url} alt="nft_img" />
                    </div>
                </div>

                <button className='item_detail_buy_btn'
                    style={{background: cartItem.includes(matchedNft)?'grey':''}}
                    onClick={() => addToCart(matchedNft)}
                >Buy now
                </button>

                <div className="item_detail_des_container">
                    <div className="trait">
                        <h4>
                            <AiOutlineQq />
                            <span>Traits</span>
                        </h4>
                        <h3
                            onClick={() => setTRadeHide(!traitHide)}
                            >
                            {traitHide? <BsChevronDown/>:<BsChevronRight/>}
                        </h3>
                    </div>
                        <div className="trait_detail_container"
                            style={{display: traitHide?'none':''}}
                        >
                            <div className="trait_detail">
                                <h5>{matchedNft.nft.traits[1].trait_type}</h5>
                                <h4>{matchedNft.nft.traits[1].value}</h4>
                            </div>
                            <div className="trait_detail">
                                <h5>{matchedNft.nft.traits[4].trait_type}</h5>
                                <h4>{matchedNft.nft.traits[4].value}</h4>
                            </div>
                            <div className="trait_detail">
                                <h5>{matchedNft.nft.traits[2].trait_type}</h5>
                                <h4>{matchedNft.nft.traits[2].value}</h4>
                            </div>
                            <div className="trait_detail">
                                <h5>{matchedNft.nft.traits[3].trait_type}</h5>
                                <h4>{matchedNft.nft.traits[3].value}</h4>
                            </div>
                            <div className="trait_detail">
                                <h5>{matchedNft.nft.traits[0].trait_type}</h5>
                                <h4>{matchedNft.nft.traits[0].value}</h4>
                            </div>        
                    </div>
                </div>
            </div>
        </section>
    );
}
