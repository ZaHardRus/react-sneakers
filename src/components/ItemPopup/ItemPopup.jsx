import s from './ItemPopup.module.scss'

export const ItemPopup = ({image,setPopupVisible}) => {
    return(
        <div className={s.overlay}>
            <div className={s.popupBlock}>
                <img src={image} alt="sneaker"/>
                <div className={s.close} onClick={()=>setPopupVisible(false)}>Закрыть</div>
            </div>
        </div>
    )
}