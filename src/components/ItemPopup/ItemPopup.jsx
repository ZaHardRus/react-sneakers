import s from './ItemPopup.module.scss'
import {useState} from "react";

export const ItemPopup = ({image,setPopupVisible}) => {
    let [slide,setSlide] = useState(1)

    const parsePath = (path) => {
        const result = path.split('/')
        result[result.length-1] = `${slide}.jpg`
        return result.join('/')
    }
    const next = () => {
        if(slide >= 5){
            setSlide(1)
        }else{
            setSlide(prev=>prev+1)
        }
    }
    const prev = () => {
        if(slide <= 1){
            setSlide(5)
        }else{
            setSlide(prev=>prev-1)
        }
    }

    return(
        <div className={s.overlay}>
            <div className={s.popupBlock}>
                <div className={s.arrow} onClick={prev}>{'<'}</div>
                <img src={parsePath(image)} alt="sneaker"/>
                <div className={s.close} onClick={()=>setPopupVisible(false)}>Закрыть</div>
                <div className={s.arrow} onClick={next}>{'>'}</div>
            </div>
        </div>
    )
}