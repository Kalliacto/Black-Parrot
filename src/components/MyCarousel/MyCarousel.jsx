import React from 'react';
import './myCarousel.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import Card from '../Card/Card';
import { useLocation } from 'react-router-dom';

const MyCarousel = ({ cards, text }) => {
    const location = useLocation();

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 850,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <div className='carousel'>
            <div className='carousel__wrap'>
                <h2 className='carousel__title'>{text}</h2>
                <Slider {...settings}>
                    {cards?.map((elem) => {
                        return <Card key={elem._id} {...elem} product={elem} />;
                    })}
                </Slider>
            </div>
        </div>
    );
};

export default MyCarousel;
