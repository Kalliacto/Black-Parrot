import React, { useState } from 'react';
import './productReviews.css';
import { timeOptions } from '../../utils/utils';
import Rate from '../Rate/Rate';

const ProductReviews = ({ productInfo }) => {
    const [formActive, setFormActive] = useState(false);

    const submitReview = () => {
        console.log('click');
    };
    console.log({ productInfo });
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
                {productInfo.reviews.map((item) => {
                    return (
                        <div key={item._id} className='reviews__item'>
                            <div className='reviews__name-wrap'>
                                <span className='reviews__name'>{item.author.name}&#160;</span>
                                <span className='reviews__date'>
                                    {new Date(item.created_at).toLocaleString('ru-RU', timeOptions)}
                                </span>
                            </div>
                            <div className='reviews__rate'>
                                <Rate rate={item.rating} />
                            </div>
                            <div className='reviews__text'>{item.text}</div>
                        </div>
                    );
                })}
                <button className='reviews_btn btn__all_reviews'>Все отзывы {'>'}</button>
            </div>
        </div>
    );
};

export default ProductReviews;
