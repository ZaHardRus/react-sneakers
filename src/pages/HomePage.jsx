import React from "react";
import Loupe from "../assets/loupe.svg";
import {Card} from "../components/Card/Card";
import {useContext} from "react";
import {AppContext} from "../App";
import {MainSlider} from "../components/Slider/Slider";

export const HomePage = React.memo(
    ({searchStr, searchHandler, addToCart, addToFavorites, isLoading, setSelectedProducts}) => {
        const {cards, isItemAdded, isItemFavorited} = useContext(AppContext)
        const renderItems = () => {
            const filtredItems = cards.filter(el => el.name.toLowerCase().includes(searchStr.toLowerCase()))
            return (isLoading
                ? [...Array(8)].map((el, i) =>
                    <Card
                        key={i}
                        isLoading={isLoading}
                    />)
                : filtredItems).map((el, i) =>
                <Card
                    setSelectedProducts={setSelectedProducts}
                    key={i}
                    info={el}
                    addToCart={addToCart}
                    addToFavorites={()=>addToFavorites(el)}
                    favorite={isItemFavorited(el.id)}
                    added={isItemAdded(el.id)}
                    isLoading={isLoading}
                    isItemAdded={isItemAdded}
                    validSizes={el.sizes}
                    allSizes={[35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46]}
                />)
        }
        return (
            <div className="content">
                <MainSlider/>
                <div className='search d-flex justify-between align-center'>
                    {searchStr ? <h1>Идет поиск</h1> : <h1>Все кроссовки</h1>}
                    <div className="search-block d-flex align-center">
                        <img src={Loupe} alt="search"/>
                        <input
                            type="text"
                            placeholder='Поиск...'
                            defaultValue={searchStr}
                            onChange={searchHandler}
                        />
                    </div>
                </div>
                <div className="cards d-flex">
                    {renderItems()}
                </div>
            </div>
        )
    })