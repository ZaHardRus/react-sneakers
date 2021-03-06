import React, {useContext, useRef, useState} from "react";
import s from './Card.module.scss'
import HeartDisabled from "../../assets/heart-disabled.svg";
import HeartActive from "../../assets/heart-active.svg";
import ButtonPlus from "../../assets/plus.svg";
import ButtonAdded from "../../assets/added.svg";
import ContentLoader from "react-content-loader"
import {AppContext} from "../../App";
import {formatPrice} from "../../utils/formatPrice";
import {Link} from "react-router-dom";

export const Card = ({info, isLoading = false, addToCart, addToFavorites, validSizes = [],allSizes}) => {
    const {isItemAdded, isItemFavorited} = useContext(AppContext)
    const sizesSneakers = allSizes.filter(el => validSizes.includes(el));
    const [selectedSize, setSelectedSize] = useState(allSizes[0])

    const setProduct = () => {
        addToCart({...info, size: selectedSize})
    }
    const setFavorites = () => {
        addToFavorites({...info, size: selectedSize})
    }
    const select = useRef()
    return (
        isLoading
            ? <div className={s.card}>
                <ContentLoader
                    speed={2}
                    width={160}
                    height={300}
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
                <div className={s.topInfo}>
                    <img
                        onClick={setFavorites}
                        src={isItemFavorited(info.id) ? HeartActive : HeartDisabled}
                        className={'cu-p'}
                        alt="like-disabled"/>
                    {!isItemAdded(info.id) && <div>
                        <p className={s.sizesTitle}>????????????:</p>
                        <select ref={select} onChange={(e) => setSelectedSize(e.target.value)}>
                            <option value={'---'}>{'---'}</option>
                            {sizesSneakers.map(el => <option key={el} value={el}>{el}</option>)}
                        </select>
                    </div>
                    }
                </div>
                <div className='d-flex justify-center'>
                    <Link to={`/${info.id}`}>
                        <img width={160}
                             src={info.imageUrl[0]}
                             alt="sneakers"
                             className={'cu-p'}
                        />
                    </Link>

                </div>
                <h5>{info.name}</h5>
                <div className='d-flex mt-10 justify-between align-center'>
                    <div className='d-flex justify-between flex-column  '>
                        <p className={s.cardPrice1}>????????:</p>
                        <p className={s.cardPrice2}>{formatPrice(info.price)} ??????.</p>
                    </div>
                    <div>
                    </div>
                    <div>
                        <img
                            className={s.plus}
                            src={isItemAdded(info.id) ? ButtonAdded : ButtonPlus}
                            alt="toggle-add/delete-item-to-cart"
                            onClick={isItemAdded(info.id)
                                ? setProduct
                                : selectedSize === allSizes[0]
                                    ? () => alert('?????????? ?????????????????????? ???????????? ?? ?????????????? ???????????????? ????????????...')
                                    : setProduct}
                        />
                    </div>
                </div>
            </div>
    )
}

