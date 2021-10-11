import React, {useEffect, useRef, useState} from "react";
import {Route} from "react-router-dom";
import {Drawer} from "./components/Drawer/Drawer";
import {Header} from "./components/Header/Header";
import {HomePage} from "./pages/HomePage";
import {FavoritesPage} from "./pages/FavoritesPage";
import axios from "axios";
import {OrdersPage} from "./pages/OrdersPage";

export const AppContext = React.createContext({})

function App() {
    const calcCost = () => {
        return selectedProducts.reduce((acc, el) => acc + (+el.price), 0)
    }
    let [cards, setCards] = useState([])
    let [selectedProducts, setSelectedProducts] = useState([])
    let [favorites, setFavorites] = useState([])
    let [cartOpened, setCartOpened] = useState(false)
    let [isLoading, setIsLoading] = useState(true)
    let [searchStr, setSearchStr] = useState('')
    let [totalCost, setTotalCost] = useState(calcCost)
    const body = useRef(document.body)
    if(cartOpened){
        body.current.style.overflow = 'hidden'
    }else{
        body.current.style.overflow = 'auto'
    }
    const addToFavorites = async (obj) => {
        try {
            let res = await axios.get('https://613631038700c50017ef5490.mockapi.io/favorites')
                .then(response => response.data.find(item => item.id === obj.id))
            if (res?.id) {
                await axios.delete(`https://613631038700c50017ef5490.mockapi.io/favorites/${res.ObjectId}`)
                    .then(() => setFavorites(prev => [...prev.filter(item => item.id !== obj.id)]))
            } else {
                await axios.post('https://613631038700c50017ef5490.mockapi.io/favorites', obj)
                    .then(() => setFavorites(prev => [...prev, obj]))
            }
        } catch (e) {
            alert('Произошла ошибка при попытке добавления/удаления товара в избранное.')
        }
    }

    const addToCart = async (el) => {
        try {
            let res = await axios.get('https://613631038700c50017ef5490.mockapi.io/cart')
                .then(response => response.data.find(item => item.id === el.id))
            if (res?.id) {
                axios.delete(`https://613631038700c50017ef5490.mockapi.io/cart/${res.ObjectId}`)
                    .then((res) => setSelectedProducts(prev => prev.filter(item => item.id !== res.data.id)))
            } else {
                axios.post('https://613631038700c50017ef5490.mockapi.io/cart', el)
                    .then(() => setSelectedProducts(prev => [...prev, el]))
            }
        } catch (e) {
            alert('Произошла ошибка при попытке добавления/удаления товара в корзину.')
        }
    }
    const searchHandler = (e) => {
        setSearchStr(e.target.value)
    }

    //Для контекста
    const isItemAdded = (id) => {
        return selectedProducts.some((obj) => obj.id === id);
    };
    const isItemFavorited = (id) => {
        return favorites.some(item => item.id === id)
    }
    //

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
                    axios.get('https://613631038700c50017ef5490.mockapi.io/cart'),
                    axios.get('https://613631038700c50017ef5490.mockapi.io/favorites'),
                    axios.get('https://613631038700c50017ef5490.mockapi.io/products')
                ])
                setIsLoading(false);

                setFavorites(prev => favoritesResponse.data)
                setSelectedProducts(prev => cartResponse.data)
                setCards(prev => itemsResponse.data)
            } catch (e) {
                alert("Произошла ошибка при получении данных...")
            }
        }

        fetchData();
    }, [])

    useEffect(() => {
        setTotalCost(calcCost())
    }, [selectedProducts])

    return (
        <AppContext.Provider
            value={{
                selectedProducts, favorites, cards, totalCost,
                isItemAdded, isItemFavorited,
            }}>
            <div className='wrapper clear'>
                {cartOpened &&
                <Drawer
                    dismissible
                    setSelectedProducts={setSelectedProducts}
                    selectedProducts={selectedProducts}
                    setCartOpened={setCartOpened}
                    addToCart={addToCart}
                />
                }
                <Header
                    setCartOpened={setCartOpened}
                    totalCost={totalCost}
                    cartLength={selectedProducts.length}
                    favoritesLength={favorites.length}
                />
                <Route path={'/'} exact>
                    <HomePage
                        searchStr={searchStr}
                        searchHandler={searchHandler}
                        setSelectedProducts={setSelectedProducts}
                        addToCart={addToCart}
                        addToFavorites={addToFavorites}
                        setFavorites={setFavorites}
                        isLoading={isLoading}
                    />
                </Route>
                <Route path={'/favorites'} exact>
                    <FavoritesPage
                        setFavorites={setFavorites}
                        addToCart={addToCart}
                        addToFavorites={addToFavorites}
                        setSelectedProducts={setSelectedProducts}
                        selectedProducts={selectedProducts}
                    />
                </Route>
                <Route path={'/order'} exact>
                    <OrdersPage/>
                </Route>
            </div>
        </AppContext.Provider>
    );
}

export default App;
