import Loupe from "../assets/loupe.svg";
import {Card} from "../components/Card/Card";

export const HomePage = ({searchStr,
    searchHandler,
    cards,
    setSelectedProducts,
    addToCart,
    addToFavorites
}) => {
    return (
        <div className="content p-40">
            <div className='d-flex justify-between align-center'>
                {searchStr ? <h1>Идет поиск</h1> : <h1>Все кроссовки</h1>}
                <div className="search-block d-flex align-center">
                    <img src={Loupe} alt="search"/>
                    <input
                        type="text"
                        placeholder='Поиск...'
                        value={searchStr}
                        onChange={searchHandler}
                    />
                </div>
            </div>
            <div className="cards d-flex">
                {cards
                    .filter(el => {
                        const reg = new RegExp(searchStr, 'gui')
                        return el.name.match(reg)
                    })
                    .map((el, i) => <Card
                        setSelectedProducts={setSelectedProducts}
                        key={i}
                        info={el}
                        addToCart={() => addToCart(el)}
                        addToFavorites={() => addToFavorites(el)}
                    />)}
            </div>
        </div>
    )
}