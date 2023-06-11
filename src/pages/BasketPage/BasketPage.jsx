import React from 'react';
import './basketPage.scss';
import GoBack from '../../components/GoBack/GoBack';
import { useSelector } from 'react-redux';
import { getEndings } from '../../utils/utils';
import NotFoundComponent from '../../components/NotFoundComponent/NotFoundComponent';
import Basket from '../../components/Basket/Basket';

const BasketPage = () => {
    const { basketProducts, isLoading } = useSelector((s) => s.basket);

    return (
        <div className='basket__wrapper'>
            <GoBack />
            {isLoading ? (
                <div className='preload'></div>
            ) : (
                <div className='basket__container'>
                    {!!basketProducts.length ? (
                        <>
                            <p className='basket__title'>
                                <span>У вас </span>
                                <b>{basketProducts.length}</b>
                                <b>{getEndings(basketProducts.length, 'товар')}</b>
                                <span> в корзине</span>
                            </p>
                            <Basket />
                        </>
                    ) : (
                        <NotFoundComponent
                            text={
                                <div className='notFoundFavorite__container'>
                                    <h3 className='notFoundFavorite__title'>
                                        В Корзине пока ничего нет️
                                    </h3>
                                </div>
                            }
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default BasketPage;
