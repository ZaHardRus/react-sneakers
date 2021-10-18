import {useEffect, useState} from "react";
import axios from "axios";
import {CardOrder} from "../components/Card/CardOrder";
import {Info} from "../components/Info/Info";
import OrderIsEmpty from "../assets/OrderIsEmpty.png"
import {useHistory} from "react-router-dom";
import {MyLoader} from "../components/MyLoader/MyLoader";
import {formatPrice} from "../utils/formatPrice";
import {formatDate} from "../utils/formatDate";

export const OrdersPage = () => {
    const [myOrders, setMyOrders] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()
    const backHome = () => {
        history.push('./')
    }
    useEffect(() => {
        try {
            setIsLoading(true)
            axios.get('https://613631038700c50017ef5490.mockapi.io/order')
                .then(res => setMyOrders(res.data))
                .then(() => setIsLoading(false))
        } catch (e) {
            alert('Ошибка при запросе заказоа')
            console.error(e)
        }
    }, [])


    if (isLoading) {
        return (
            <div className="content">
                <MyLoader text={'Подождите, идет загрузка заказов...'}/>
            </div>
        )
    }
    return (
        myOrders.length
            ?
            <div className="content p-40">
                <div className='d-flex justify-between align-center'>
                    <h1>Мои заказы:</h1>
                </div>
                <div className={'order'}>
                    {myOrders
                        .map((el, i) =>
                            <div className={'cardsOrderWrapper'} key={i}>
                                <h3>Заказ № {el.OrderId}</h3>
                                <div className={'cardOrder'}>
                                    {el.items.map((item, i) =>
                                        <CardOrder
                                            key={item.ObjectId}
                                            name={item.name}
                                            price={item.price}
                                            imageUrl={item.imageUrl[0]}
                                            size={item.size}
                                        />
                                    )}
                                </div>
                                <div className={'orderInfo'}>
                                    <p className={'orderCost'}><b>Общая стоимость
                                        заказа:</b> {formatPrice(el.totalCost)} руб.</p>
                                    <p className={'orderDate'}><b>Дата заказа:</b> {formatDate(el.date)}
                                    </p>
                                </div>
                            </div>)
                    }
                </div>
            </div>
            :
            <Info
                title={'У вас нет заказов'}
                text={'Оформите хотя бы один заказ.'}
                img={OrderIsEmpty}
                backHandler={() => backHome()}
            />


    )
}