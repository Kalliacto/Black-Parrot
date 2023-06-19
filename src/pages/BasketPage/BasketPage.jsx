import React from 'react';
import './basketPage.scss';
import GoBack from '../../components/GoBack/GoBack';
import { useSelector } from 'react-redux';
import { getEndings } from '../../utils/utils';
import Basket from '../../components/Basket/Basket';
import MyCarousel from '../../components/MyCarousel/MyCarousel';

const BasketPage = () => {
    const { basketProducts, isLoading } = useSelector((s) => s.basket);
    const { products } = useSelector((s) => s.products);
    const { productsInLocal } = useSelector((s) => s.oneProduct);

    return (
        <div className='basket__wrapper'>
            <GoBack />
            {isLoading ? (
                <div className='preload'></div>
            ) : (
                <div className='basket__container'>
                    <>
                        <p className='basket__title'>
                            <span>У вас </span>
                            <b>{basketProducts.reduce((acc, el) => acc + el.count, 0)}</b>
                            <b>
                                {getEndings(
                                    basketProducts.reduce((acc, el) => acc + el.count, 0),
                                    'товар'
                                )}
                            </b>
                            <span> в корзине</span>
                        </p>
                        <Basket />
                    </>
                </div>
            )}
            {productsInLocal.length === 5 ? (
                <MyCarousel cards={productsInLocal} text={'Просмотренные товары'} />
            ) : (
                <MyCarousel cards={products} text={'Рекомендуем взять'} />
            )}
        </div>
    );
};

export default BasketPage;
