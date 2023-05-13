import React, { useState } from 'react';
import './productReviews.css';

const timeOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
};

const ProductReviews = ({ productInfo }) => {
    const [formActive, setFormActive] = useState(false);

    const submitReview = () => {
        console.log('click');
    };
    return (
        <div className='product__reviews'>
            <h2 className='product__reviews_title'>Отзывы</h2>
            <button className='reviews_btn' onClick={() => setFormActive(!formActive)}>
                Написать отзыв
            </button>
            {formActive && (
                <form className='form__reviews' onSubmit={submitReview}>
                    Rate Component
                    <textarea
                        name='reviews'
                        type='text'
                        placeholder='Ваш отзыв'
                        className='form__reviews_input'
                    />
                    <button type='submit' className='reviews_btn'>
                        Отправить
                    </button>
                </form>
            )}
            <div className='reviews__list'>
                {/* {productInfo.reviews} */}
                {console.log(productInfo.reviews)}
            </div>
        </div>
    );
};

export default ProductReviews;
