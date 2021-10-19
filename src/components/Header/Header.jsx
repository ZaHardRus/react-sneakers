import s from './Header.module.scss'
import HeaderLogo from "../../assets/header-logo1.png";
import HeaderCart from "../../assets/header-bag2.svg";
import HeaderLike from "../../assets/header-like1.svg";
import HeaderAvatar from "../../assets/header-avatar.svg";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {AppContext} from "../../App";
import {formatPrice} from "../../utils/formatPrice";

export const Header = ({cartLength,favoritesLength,...props}) => {
    const {totalCost} = useContext(AppContext)
    return (
        <header className={s.header}>
            <Link to={'/'}>
                <div className={s.headerLeft}>
                    <img width={70} height={70} src={HeaderLogo} alt="header-logo"/>
                    <div className={s.headerLeftInfo}>
                        <h2 className={s.title}>STREET SNEAKERS</h2>
                        <p className={s.text}>Магазин кроссовок</p>
                    </div>
                </div>
            </Link>
            <ul className={s.headerRight}>

                <Link to={'/favorites'}>
                    <li className={s.headerLike}>
                        <h5>Избранное</h5>
                        <div className={s.headerGroup}>
                            <img width={40} height={40} src={HeaderLike} alt="favorites=link"/>
                            <p>{favoritesLength}</p>
                        </div>

                    </li>
                </Link>
                <li className={s.headerCart} onClick={() => props.setCartOpened(true)}>
                    <h5>Корзина</h5>
                    <div className={s.headerGroup}>
                        <img width={40} height={40} src={HeaderCart} alt="cart-link"/>
                        <p>{cartLength}</p>
                    </div>
                    {cartLength ? <h5 className={s.headerPrice}><span>{formatPrice(totalCost)} руб.</span></h5> : null}
                </li>
                <Link to={'/order'}>
                    <li className={s.headerAvatar}>
                        <h5>Мои заказы</h5>
                        <img width={40} height={40} src={HeaderAvatar} alt="order-link"/>
                    </li>
                </Link>
            </ul>
        </header>
    )
}