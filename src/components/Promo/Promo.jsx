import React from 'react';
import './style.css';

const Promo = ({ img }) => {
    return (
        <div className='promo__block'>
            <div className='promo__img'>
                <img src={img} alt='Promo' />
            </div>
        </div>
    );
};

export default Promo;
