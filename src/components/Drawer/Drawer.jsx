import s from './Drawer.module.scss'
import EmptyCart from "../../assets/emptyCart.png";
import ButtonDelete from "../../assets/delete.svg";
import ArrowNext from "../../assets/arrow-next.svg";
import OrderAdded from "../../assets/orderAdded.png";
import {Info} from "../Info/Info";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AppContext} from "../../App";
import {formatPrice} from "../../utils/formatPrice";


export const Drawer = ({selectedProducts, setSelectedProducts, ...props}) => {
    const [isOrderAdded, setIsOrderAdded] = useState(false)
    const [orderNum, setOrderNum] = useState(0)
    const {totalCost} = useContext(AppContext)

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const sendOrder = async () => {
        const res = await axios.post('https://613631038700c50017ef5490.mockapi.io/order',
            {
                items: selectedProducts,
                totalCost,
                date: Date.now()
            })
        setOrderNum(res.data.OrderId)
        setIsOrderAdded(true)
        setSelectedProducts([])
        for (let i = 0; i < selectedProducts.length; i++) {
            const item = selectedProducts[i];
            await delay(500);
            await axios.delete(`https://613631038700c50017ef5490.mockapi.io/cart/${item.ObjectId}`);
            await delay(500);
        }
    }

    useEffect(() => {
        axios.get(`https://613631038700c50017ef5490.mockapi.io/cart`)
            .then(res => setSelectedProducts(res.data))
    }, []);

    return (
        <div className={s.overlay}>
            <div className={s.drawerBlock}>
                <h2 className='d-flex justify-between'>Корзина
                    <img onClick={() => props.setCartOpened(false)}
                         className='cu-p close'
                         src={ButtonDelete}
                         alt="delete"/>
                </h2>

                <div className={isOrderAdded || selectedProducts.length === 0
                    ? s.cartWrapperCenter
                    : s.cartWrapper}>
                    {selectedProducts.length !== 0
                        ?
                        <>
                            <div className={s.cartItemsWrapper}>
                                {selectedProducts.map((el) =>
                                    <div key={el.id} className={s.cartItem}>
                                        <img height={70} width={70} src={el.imageUrl[0]} alt=""/>
                                        <div className={s.itemInfo}>
                                            <p>{el.name}</p>
                                            <p className={s.size}>{el.size} размер</p>
                                            <b>{formatPrice(el.price)} руб.</b>
                                        </div>
                                        <div onClick={() => props.addToCart(el)} className={s.delete}>
                                            <img src={ButtonDelete} alt="delete"/>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div>
                                <ul className={s.payment}>
                                    <li className={s.total}>
                                        <span>Итого: </span>
                                        <div className={s.dashedLine}/>
                                        <b>{new Intl.NumberFormat('ru-RU').format(totalCost)}руб.</b>
                                    </li>
                                </ul>
                                <button
                                    onClick={sendOrder}
                                    className='green_button'>
                                    Оформить заказ
                                    <img src={ArrowNext}
                                         alt="arrow next"/>
                                </button>
                            </div>

                        </>
                        :
                        <Info
                            img={isOrderAdded ? OrderAdded : EmptyCart}
                            title={isOrderAdded ? 'Заказ оформлен!' : 'Корзина пуста...'}
                            text={isOrderAdded
                                ? `Ваш заказ #${orderNum} скоро будет передан курьерской доставке`
                                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
                            }
                            backHandler={() => props.setCartOpened(false)}
                        />
                    }
                < /div>
            </div>
        </div>
    )
}