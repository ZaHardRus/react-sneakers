import HeartDisabled from "../../assets/heart-disabled.svg";
import ButtonPlus from "../../assets/plus.svg";

export const Card = () => {
    return (
        <div className="card">
            <div className='card_favorite'>
                <img src={HeartDisabled} alt="like-disabled"/>
            </div>
            <div className='d-flex justify-center'>
                <img width={133} height={112} src="./image/sneakers/Nike Blazer Mid Suede Green.jpg"
                     alt=""/>
            </div>
            <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
            <div className='d-flex mt-10 justify-between align-center'>
                <div className='d-flex justify-between flex-column  '>
                    <p className='card_price1'>Цена:</p>
                    <p className='card_price2'>12 999 rub</p>
                </div>
                <div className='card_add'>
                    <img src={ButtonPlus} alt=""/>
                </div>
            </div>
        </div>
    )
}