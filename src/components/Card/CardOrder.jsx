import s from "./Card.module.scss";
import React from "react";

export const CardOrder = ({size,imageUrl, name, price}) => {
    return (
        <div className={s.card}>
            <div className='d-flex justify-center'>
                <img width={133}
                     height={112}
                     src={imageUrl}
                     alt="sneaker"
                     className={'cu-p'}
                />
            </div>
            <h5>{name}</h5>
            <div className='d-flex mt-10 justify-between align-center'>
                <div className='d-flex justify-between flex-column  '>
                    <p className={s.cardPrice1}>Цена:</p>
                    <p className={s.cardPrice2}>{new Intl.NumberFormat('ru-RU').format(price)} руб.</p>
                </div>
                <div>
                    <p className={s.cardPrice1}>Размер:</p>
                    <p className={s.cardPrice2}>{size}</p>
                </div>
            </div>
        </div>
    )
}