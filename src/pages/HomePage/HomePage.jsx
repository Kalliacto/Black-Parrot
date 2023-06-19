import React from 'react';
import './homePage.scss';
import { Link } from 'react-router-dom';
import MyCarousel from '../../components/MyCarousel/MyCarousel';
import { useSelector } from 'react-redux';
import Promo from '../../components/Promo/Promo';
import banner from '../../img/Banner.jpg';
import PromoHot from '../../components/PromoHot/PromoHot';

const HomePage = () => {
    const { topSaleCards, topFavoritesCards } = useSelector((s) => s.products);

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
            <MyCarousel cards={topSaleCards.slice(0, 5)} text={'Самая горячая распродажа'} />
            <Promo img={banner} />
            <MyCarousel cards={topFavoritesCards.slice(2, 9)} text={'Самые популярные товары'} />
        </div>
    );
};

export default HomePage;
