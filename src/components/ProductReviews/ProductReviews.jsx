import React, { useState } from 'react';
import './productReviews.css';
import { timeOptions } from '../../utils/utils';
import Rate from '../Rate/Rate';
import { useForm } from 'react-hook-form';
import { api } from '../../utils/api';

const ProductReviews = ({ productInfo }) => {
    const [formActive, setFormActive] = useState(false);
    const { register, handleSubmit, reset } = useForm({});

    const submitReview = async (review) => {
        return await api
            .addNewReview(productInfo._id, review)
            .then(reset())
            .catch((error) => console.log(error));
    };

    console.log({ productInfo });
    return (
        <div className='product__reviews'>
            <h2 className='product__reviews_title'>Отзывы</h2>
            <button className='reviews_btn' onClick={() => setFormActive(!formActive)}>
                Написать отзыв
            </button>
            {formActive && (
                <form className='form__reviews' onSubmit={handleSubmit(submitReview)}>
                    Rate Component
                    <textarea
                        type='text'
                        {...register('text')}
                        placeholder='Ваш отзыв'
                        className='form__reviews_input'
                        rows={3}
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
