import './MyLoader.css'
export const MyLoader = ({text}) => {
    return(
        <div>
            <div className="lds-circle">
                <div className={'text-center'}/>
            </div>
            <h3 className={'textLoader'}>{text}</h3>
        </div>

    )
}