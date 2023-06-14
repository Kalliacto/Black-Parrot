import React from 'react';
import './myCarousel.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';

const MyCarousel = () => {
    const { products } = useSelector((s) => s.products);
    const { productsInLocal } = useSelector((s) => s.oneProduct);

    console.log(productsInLocal.length);

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
            {productsInLocal.length === 5 ? (
                <>
                    <h2 className='carousel__title'>Просмотренные товары</h2>
                    <Slider {...settings}>
                        {productsInLocal.map((elem) => {
                            return <Card key={elem._id} {...elem} product={elem} />;
                        })}
                    </Slider>
                </>
            ) : (
                <>
                    <h2 className='carousel__title'>Рекомендуем взять</h2>
                    <Slider {...settings}>
                        {products.slice(0, 8).map((elem) => {
                            return <Card key={elem._id} {...elem} product={elem} />;
                        })}
                    </Slider>
                </>
            )}
        </div>
    );
};

export default MyCarousel;
