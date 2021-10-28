import slideImage1 from '../../assets/sliderImages/slide1.jpg'
import slideImage2 from '../../assets/sliderImages/slide2.jpg'
import slideImage3 from '../../assets/sliderImages/slide3.jpg'
import slideImage4 from '../../assets/sliderImages/slide4.jpg'
import slideImage5 from '../../assets/sliderImages/slide5.jpg'
import Slider from 'react-touch-drag-slider'
import './Slider.scss'
import {useEffect, useRef, useState} from "react";

export const MainSlider = () => {
    const image = [slideImage4,slideImage1,slideImage3,slideImage2,slideImage5]
    let [index, setIndex] = useState(0)
    let flipInterval = useRef(null);
    const autoPlay = () => {
        let next = true
        flipInterval.current = setInterval(() => {
            if (index === image.length - 1) {
                next = false
            }
            if (index === 0) {
                next = true
            }
            if (index !== image.length - 1 && next) {
                setIndex(index += 1)
            } else {
                setIndex(index -= 1)
            }
        }, 5000)
    }
    useEffect(() => {
        autoPlay()
    }, [])
    useEffect(()=>{
        return function (){
            clearInterval(flipInterval.current)
        }
    },[])

    return (
        <div className={'image'}
             onMouseLeave={()=>autoPlay()}
             onMouseEnter={()=>clearInterval(flipInterval.current)
             }>
            <Slider
                infinite
                activeIndex={index}
                threshHold={100}
                transition={1.2}
                scaleOnDrag={true}
            >
                {image.map((el, index) => (
                    <img src={el} key={index} alt={'title'}/>
                ))}
            </Slider>
        </div>

    )
}