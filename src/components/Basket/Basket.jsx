import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './basket.scss';
import { Trash } from 'react-bootstrap-icons';
import { deleteProductFromBasket, sendingAnOrder } from '../../store/slices/basketSlice';
import BasketController from './BasketController/BasketController';
import ProductPrice from '../ProductPrice/ProductPrice';
import { useNavigate } from 'react-router-dom';

const Basket = () => {
    const dispatch = useDispatch();
    const { basketProducts } = useSelector((s) => s.basket);
    const navigate = useNavigate();

    const sumAllProduct = basketProducts.reduce((acc, el) => acc + el.product.price * el.count, 0);
    const saleAllProduct = basketProducts.reduce(
        (acc, el) => acc + ((el.product.discount * el.product.price) / 100) * el.count,
        0
    );
    const resultAllProduct = sumAllProduct - saleAllProduct;

    const sendData = (data) => {
        dispatch(sendingAnOrder(data));
        alert('Ваш заказ успешно принят!');
        navigate('/');
    };

    return (
        <div className='basket__content-wrap'>
            <div className='basket__content'>
                {basketProducts.map((elem) => {
                    return (
                        <div key={elem.product._id} className='basket__item'>
                            <div className='basket__item-img'>
                                <img src={elem.product.pictures} alt='Фото продукта' />
                            </div>
                            <div className='basket__item-info'>
                                <div className='basket__item-name'>{elem.product.name}</div>
                                <div className='basket__item-count'>{elem.product.wight}</div>
                            </div>
                            <ProductPrice productInfo={elem.product} />
                            <BasketController product={elem.product} count={elem.count} />
                            <Trash
                                className='basket__item-trash'
                                onClick={() => {
                                    dispatch(deleteProductFromBasket(elem.product));
                                }}
                            />
                        </div>
                    );
                })}
            </div>
            <div className='basket__result'>
                <h3 className='basket__result-title'>Ваша корзина</h3>
                <div className='basket__result-info'>
                    <div className='basket__result-info-list'>
                        <span>Товары ({basketProducts?.length})</span>
                        <span>{Math.round(sumAllProduct)}&nbsp;₽</span>
                    </div>
                    <div className='basket__result-info-list'>
                        <span>Скидка</span>
                        <span className='_red'>- {Math.round(saleAllProduct)}&nbsp;₽</span>
                    </div>
                    <div className='basket__result-info-list'>
                        <span>
                            <b>Общая стоимость</b>
                        </span>
                        <span>{Math.round(resultAllProduct)}&nbsp;₽</span>
                    </div>
                </div>
                <button
                    onClick={() => sendData(localStorage.getItem('basketParrot'))}
                    className='basket__result-btn'
                >
                    Оформить заказ
                </button>
            </div>
        </div>
    );
};

export default Basket;
