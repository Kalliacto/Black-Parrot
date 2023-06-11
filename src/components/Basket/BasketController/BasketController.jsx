import React from 'react';
import './basketController.css';
import { addBasketProduct, removeBasketProduct } from '../../../store/slices/basketSlice';
import { useDispatch } from 'react-redux';

const BasketController = ({ product, count }) => {
    const dispatch = useDispatch();

    return (
        <div className='product__counter_btns'>
            <p
                className='btn_minus'
                onClick={() => {
                    dispatch(removeBasketProduct({ product, count: 1 }));
                }}
            >
                -
            </p>
            {!!count ? <span>{count}</span> : <span>0</span>}
            {/* <span>{count}</span> */}
            <p
                className='btn_plus'
                onClick={() => {
                    dispatch(addBasketProduct({ product, count: 1 }));
                }}
            >
                +
            </p>
        </div>
    );
};

export default BasketController;
