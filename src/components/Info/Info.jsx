import ArrowPrev from "../../assets/arrow-prev.svg";
import s from './Info.module.scss'

export const Info = (props) => {
    return (
        <div className={s.contentEmpty}>
            <div className={s.empty}>
                <div className={'d-flex justify-center align-center'}>
                    <img width={120} height={120} src={props.img} alt="empty-smile"/>
                </div>
                <div className='text-center'>
                    <h3>{props.title}</h3>
                    <p className='text-center mt-20'>{props.text}</p>
                </div>

                <button onClick={props.backHandler} className='green_button'>
                    <img src={ArrowPrev} alt="arrow prev"/>
                    Вернуться назад
                </button>
            </div>
        </div>
    )
}