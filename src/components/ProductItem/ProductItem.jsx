import s from './ProductItem.module.scss'
import {useState} from "react";
import Slider from 'react-touch-drag-slider'

export const ProductItem = ({
                                id, price, image = [],
                                loading, title = '', description = '',
                                redirect, addToFavorites, isItemFavorited
                            }) => {
    let [slide, setSlide] = useState(0)

    const next = () => {
        if (slide >= image.length - 1) {
            return null
        } else {
            setSlide(prev => prev + 1)
        }
    }
    const prev = () => {
        if (slide <= 0) {
            return null
        } else {
            setSlide(prev => prev - 1)
        }
    }
    const clickFavorites = () => {
        addToFavorites()
    }
    return (
        <div className={s.productWrapper}>
            <h1 className={s.title}>{title}</h1>
            <div className={s.product}>
                <div className={s.image}>
                    {loading ? <p className={s.loading}>Загрузка изображения...</p> :
                        <Slider
                            onSlideComplete={(i) => {
                                setSlide(i)
                            }}
                            activeIndex={slide}
                            threshHold={100}
                            transition={0.8}
                            scaleOnDrag={true}
                        >
                            {image.map((el, index) => (
                                <img src={el} key={index } alt={'title'}/>
                            ))}
                        </Slider>}
                </div>
                <div className={s.arrowWrapper}>
                    <div className={s.arrow} onClick={prev}>
                        <svg className={s.arrowLeft} viewBox="0 0 60 100">
                            <path d="M 50,0 L 60,10 L 20,50 L 60,90 L 50,100 L 0,50 Z"/>
                        </svg>
                    </div>
                    <div className={s.arrow} onClick={next}>
                        <svg className={s.arrowRight} viewBox="0 0 60 100">
                            <path d="M 50,0 L 60,10 L 20,50 L 60,90 L 50,100 L 0,50 Z"/>
                        </svg>
                    </div>
                </div>

            </div>
            <p className={s.description}>{description}</p>
            <div className="btns-wrapper">
                <button className='red_button'
                        onClick={clickFavorites}>{isItemFavorited(id) ? 'Убрать из избранного' : 'Добавить в избранное'}</button>
                <button className='green_button' onClick={redirect}>На главную</button>
            </div>
        </div>
    )
}