import s from './ProductItem.module.scss'
import {useState} from "react";

export const ProductItem = ({image = '', loading, title='',redirect}) => {
    let [slide, setSlide] = useState(1)
    const parsePath = (path) => {
        const result = path?.split('/')
        result[result.length - 1] = `${slide}.jpg`
        return result.join('/')
    }
    const next = () => {
        if (slide >= 5) {
            setSlide(1)
        } else {
            setSlide(prev => prev + 1)
        }
    }
    const prev = () => {
        if (slide <= 1) {
            setSlide(5)
        } else {
            setSlide(prev => prev - 1)
        }
    }

    return (
        <div className={s.productWrapper}>
            <h1 className={s.title}>{title}</h1>
            <div className={s.product}>
                <div className={s.arrow} onClick={prev}>
                    <svg width="50" height="45" viewBox="0 0 16 14" fill="black" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.7144 7L1.00007 7" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 13L1 7L7 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div className={s.image}>
                    {
                        loading ? <p className={s.loading}>Загрузка изображения...</p> : <img src={parsePath(image)} alt="sneaker"/>
                    }
                </div>
                <div className={s.arrow} onClick={next}>
                    <svg width="50" height="45" viewBox="0 0 16 14" fill="black"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 7H14.7143" stroke="black" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"/>
                        <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="white" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
            <button className='green_button' onClick={redirect}>На главную</button>
        </div>
    )
}