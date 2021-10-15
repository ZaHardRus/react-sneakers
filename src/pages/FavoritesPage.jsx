import {Card} from "../components/Card/Card";
import {useContext} from "react";
import {AppContext} from "../App";
import {Info} from "../components/Info/Info";
import favoritesEmpty from '../assets/favoritesEmpty.png'
import {useHistory} from "react-router-dom";

export const FavoritesPage = ({addToCart, addToFavorites, setSelectedProducts}) => {

    const {favorites, isItemAdded, isItemFavorited} = useContext(AppContext)
    const history = useHistory()
    const backHome = () => {
        history.push('/')
    }
    if (!favorites.length) {
        return (
            <Info
                title={'Закладок нет :('}
                text={'Вы ничего не добавляли в закладки'}
                img={favoritesEmpty}
                backHandler={() => backHome()}
            />
        )
    }

    return (
        <div className="content p-40">
            <div className='d-flex justify-center mb-30 align-center'>
                <h1 >Закладки</h1>
            </div>
            <div className="cards d-flex">
                {favorites
                    .map((el, i) => <Card
                        key={el.id}
                        info={el}
                        addToCart={() => addToCart(el)}
                        addToFavorites={() => addToFavorites(el)}
                        setSelectedProducts={setSelectedProducts}
                        favorite={() => isItemFavorited(el)}
                        added={() => isItemAdded(el)}
                        allSizes={[0, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46]}
                    />)}
            </div>
        </div>
    )
}