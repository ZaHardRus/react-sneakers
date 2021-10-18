import s from './ProductItem.module.scss'
import {useState} from "react";

export const ProductItem = ({image = '', loading, title = '', description = '', redirect}) => {
    let [slide, setSlide] = useState(0)
    const next = () => {
        if (slide >= image.length - 1) {
            setSlide(0)
        } else {
            setSlide(prev => prev + 1)
        }
    }
    const prev = () => {
        if (slide <= 0) {
            setSlide(image.length - 1)
        } else {
            setSlide(prev => prev - 1)
        }
    }

    return (
        <div className={s.productWrapper}>
            <h1 className={s.title}>{title}</h1>
            <div className={s.product}>
                <div className={s.arrow} onClick={prev}>
                    <svg className={s.arrowLeft} viewBox="0 0 60 100">
                        <path d="M 50,0 L 60,10 L 20,50 L 60,90 L 50,100 L 0,50 Z"/>
                    </svg>
                </div>
                <div className={s.image}>
                    {
                        loading ? <p className={s.loading}>Загрузка изображения...</p> :
                            <img src={image[slide]} alt="sneaker"/>
                    }
                </div>
                <div className={s.arrow} onClick={next}>
                    <svg className={s.arrowRight} viewBox="0 0 60 100">
                        <path d="M 50,0 L 60,10 L 20,50 L 60,90 L 50,100 L 0,50 Z"/>
                    </svg>
                </div>
            </div>
            <p className={s.description}>{description}</p>
            <button className='green_button' onClick={redirect}>На главную</button>
        </div>
    )
}