import React, { useState } from 'react';
import './imageSlider.css';



const ImageSlider = ({ filesArray }) => {
    const [current, setCurrent] = useState(0);

    let length = filesArray[0].length;
    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    }
    // console.log("inside image slider", filesArray);
    // console.log("slide position", current, length);

    const prevNextIcons = (
        <>
            <i className="material-icons slider-left-arrow" onClick={prevSlide}>arrow_back_ios</i>
            <i className="material-icons  slider-right-arrow" onClick={nextSlide}>arrow_forward_ios</i>
        </>
    )
    return (
        <>
            <section className="slider">
                {length > 1 ? prevNextIcons : ""}

                {

                    filesArray.map(file => {
                        return file.map((img, index) => {
                            return (
                                <div className={index === current ? 'slide active' : 'slide'} key={index}>
                                    {
                                        index === current && (<img className="slide-img" src={img} alt={"img-" + index} />)
                                    }
                                </div>
                            )
                        })
                    })
                }
            </section>
        </>
    )
}

export default ImageSlider;