import React, { memo } from 'react';
import './style.css';

const PromoHot = memo(() => {
    return (
        <div className='promo__hot_wrap'>
            <div className='promo__hot_img promo__one'>
                <p className='promo__hot_text'>Корма на любой вкус и для любого размера птиц!</p>
            </div>
            <div className='promo__hot_img promo__two'>
                <p className='promo__hot_text'>
                    Используем только лучшие и натуральные материалы для вас!
                </p>
            </div>
        </div>
    );
});

export default PromoHot;
