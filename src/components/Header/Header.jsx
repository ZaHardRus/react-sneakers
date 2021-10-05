import s from './Header.module.scss'
import HeaderLogo from "../../assets/header-logo.png";
import HeaderCart from "../../assets/header-bag.svg";
import HeaderLike from "../../assets/header-like.svg";
import HeaderAvatar from "../../assets/header-avatar.svg";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {AppContext} from "../../App";
import {formatPrice} from "../../utils/formatPrice";

export const Header = (props) => {
    const {totalCost} = useContext(AppContext)
    return (
        <header className={s.header}>
            <Link to={'/'}>
                <div className={s.headerLeft}>
                    <img width={40} height={40} src={HeaderLogo} alt=""/>
                    <div className={s.headerLeftInfo}>
                        <h3 className={s.title}>REACT SNEAKERS</h3>
                        <p className={s.text}>Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>
            <ul className={s.headerRight}>
                <li className={s.headerCart} onClick={() => props.setCartOpened(true)}>
                    <img width={18} height={18} src={HeaderCart} alt=""/>
                </li>
                <li className={s.headerPrice}><span>{formatPrice(totalCost)} руб.</span></li>
                <Link to={'/favorites'}>
                    <li className={s.headerLike}>
                        <img width={18} height={18} src={HeaderLike} alt=""/>
                    </li>
                </Link>
                <Link to={'/order'}>
                    <li className={s.headerAvatar}>
                        <img width={18} height={18} src={HeaderAvatar} alt=""/>
                    </li>
                </Link>
            </ul>
        </header>
    )
}