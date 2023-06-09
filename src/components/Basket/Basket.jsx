import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Basket = () => {
    const dispatch = useDispatch();
    const { basketProducts } = useSelector((s) => s.basket);

    return (
        <div className='basket__content'>
            {basketProducts.map((elem) => {
                return (
                    <div key={elem._id}>
                        <div>{elem.name}</div>
                        <div>{elem.count}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default Basket;
