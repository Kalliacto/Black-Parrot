import React from 'react';
import './productprice.css';

const ProductPrice = ({ productInfo }) => {
    return (
        <div className='product__price'>
            {!!productInfo.discount ? (
                <span className='product__old_price'>{productInfo.price}&nbsp;₽</span>
            ) : (
                <span className='product__old_price'></span>
            )}
            {!!productInfo.discount ? (
                <span className='product__price _red'>
                    {Math.round(
                        productInfo.price - (productInfo.price * productInfo.discount) / 100
                    )}
                    &nbsp;₽
                </span>
            ) : (
                <span className='product__price _black'>
                    {Math.round(
                        productInfo.price - (productInfo.price * productInfo.discount) / 100
                    )}
                    &nbsp;₽
                </span>
            )}
        </div>
    );
};

export default ProductPrice;
