import React from 'react';
import './homePage.scss';
import { Link } from 'react-router-dom';
import MyCarousel from '../../components/MyCarousel/MyCarousel';
import { useSelector } from 'react-redux';
import Promo from '../../components/Promo/Promo';
import banner from '../../img/Banner.jpg';
import PromoHot from '../../components/PromoHot/PromoHot';

const HomePage = () => {
    const { products } = useSelector((s) => s.products);

    return (
        <div className='home__wrapper'>
            <div className='home__title_info'>
                <h1 className='home__title'>Самые лучшие лакомства для Ваших любимцев</h1>
                <h4 className='home__title-mini'>
                    Всегда самое лучшее с доставкой по России и Миру!
                </h4>
                <Link to='/catalogPage'>
                    <div className='home__title_btn'>Каталог {'>'}</div>
                </Link>
            </div>
            <PromoHot />
            {!!products && (
                <MyCarousel
                    cards={products.slice(0, 6).sort((a, b) => a.price - b.price)}
                    text={'Самая горячая распродажа'}
                />
            )}
            <Promo img={banner} />
            {!!products && (
                <MyCarousel
                    cards={products.slice(0, 6).sort((a, b) => b.likes.length - a.likes.length)}
                    text={'Самые популярные товары'}
                />
            )}
        </div>
    );
};

export default HomePage;
