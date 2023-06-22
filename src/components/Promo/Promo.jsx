import React, { memo } from 'react';
import './style.css';

const Promo = memo(({ img }) => {
    return (
        <div className='promo__block'>
            <div className='promo__img'>
                <img src={img} alt='Promo' />
            </div>
        </div>
    );
});

export default Promo;
