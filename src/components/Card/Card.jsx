import React, {useContext} from "react";
import s from './Card.module.scss'
import HeartDisabled from "../../assets/heart-disabled.svg";
import HeartActive from "../../assets/heart-active.svg";
import ButtonPlus from "../../assets/plus.svg";
import ButtonAdded from "../../assets/added.svg";
import ContentLoader from "react-content-loader"
import {AppContext} from "../../App";
import {formatPrice} from "../../utils/formatPrice";

export const Card = ({info,
                         isLoading=false,
                         addToCart,addToFavorites
                     }) => {

    const {isItemAdded, isItemFavorited} = useContext(AppContext)

    const setProduct = () => {
        const {id, name, price, imageUrl} = info
        addToCart({id, name, price, imageUrl})

    }
    const setFavorites = () => {
        const {id, name, price, imageUrl} = info
        addToFavorites({id, name, price, imageUrl})
    }
    return (
        isLoading
            ? <div className={s.card}>
                <ContentLoader
                    speed={2}
                    width={160}
                    height={210}
                    viewBox="0 0 155 210"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="3" y="-1" rx="5" ry="5" width="150" height="90"/>
                    <rect x="0" y="101" rx="5" ry="5" width="150" height="15"/>
                    <rect x="0" y="135" rx="5" ry="5" width="100" height="15"/>
                    <rect x="121" y="173" rx="5" ry="5" width="32" height="32"/>
                    <rect x="0" y="180" rx="5" ry="5" width="100" height="24"/>
                </ContentLoader>
            </div>
            : <div className={s.card}>
                <div className='card_favorite'>
                    <img
                        onClick={setFavorites}
                        src={isItemFavorited(info.id) ? HeartActive : HeartDisabled}
                        className={'cu-p'}
                        alt="like-disabled"/>
                </div>
                <div className='d-flex justify-center'>
                    <img width={133}
                         height={112}
                         src={info.imageUrl}
                         alt=""
                         className={'cu-p'}
                    />
                </div>
                <h5>{info.name}</h5>
                <div className='d-flex mt-10 justify-between align-center'>
                    <div className='d-flex justify-between flex-column  '>
                        <p className={s.cardPrice1}>Цена:</p>
                        <p className={s.cardPrice2}>{formatPrice(info.price)} руб.</p>
                    </div>
                    <div>
                        <img
                            className={s.plus}
                            src={isItemAdded(info.id) ? ButtonAdded : ButtonPlus}
                            alt=""
                            onClick={setProduct}
                        />
                    </div>
                </div>
            </div>
    )
}

