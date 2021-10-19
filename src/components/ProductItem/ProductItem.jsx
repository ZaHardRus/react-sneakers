import s from './ProductItem.module.scss'
import {useRef, useState} from "react";

export const ProductItem = ({
                                id, price, image = '',
                                loading, title = '', description = '',sizes,
                                redirect, addToFavorites, isItemFavorited
                            }) => {
    let [slide, setSlide] = useState(0)
    const slider = useRef()
    console.log(slider)
    const next = () => {
        slider.current.className = 'swap'
        setTimeout(()=>{
            if (slide >= image.length - 1) {
                setSlide(0)
            } else {
                setSlide(prev => prev + 1)
            }
            slider.current.className = ''
        },[1500])
    }
    const prev = () => {
        slider.current.className = 'swap'
        setTimeout(()=>{
            if (slide <= 0) {
                setSlide(image.length - 1)
            } else {
                setSlide(prev => prev - 1)
            }
            slider.current.className = ''
        },[1500])
    }

    const clickFavorites = () => {
        addToFavorites()
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
                            <img className='slider' ref={slider} src={image[slide]} alt="sneaker"/>
                    }
                </div>
                <div className={s.arrow} onClick={next}>
                    <svg className={s.arrowRight} viewBox="0 0 60 100">
                        <path d="M 50,0 L 60,10 L 20,50 L 60,90 L 50,100 L 0,50 Z"/>
                    </svg>
                </div>
            </div>
            <p className={s.description}>{description}</p>
            <div className="btns-wrapper">
                <button className='red_button' onClick={clickFavorites}>{isItemFavorited(id)?'Убрать из избранного':'Добавить в избранное'}</button>
                <button className='green_button' onClick={redirect}>На главную</button>
            </div>
        </div>
    )
}