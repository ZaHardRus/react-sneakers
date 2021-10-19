import './MyLoader.css'
export const MyLoader = ({text}) => {
    return(
        <div className={'loader-content'}>
            <div className="lds-circle">
                <div className={'text-center'}/>
            </div>
        </div>

    )
}