import React, { memo, useState } from 'react';
import './productReviews.css';
import { checkingTheField, timeOptions } from '../../utils/utils';
import Rate from '../Rate/Rate';
import { useForm } from 'react-hook-form';
import { Trash3 } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addReview, deleteReview } from '../../store/slices/oneProductSlice';

const ProductReviews = memo(({ productInfo }) => {
    const [rate, setRate] = useState(3);
    const { userData } = useSelector((s) => s.user);
    const { reviews: allReviews } = useSelector((s) => s.oneProduct);
    const dispatch = useDispatch();
    const [formActive, setFormActive] = useState(false);
    const [visibleReviews, setVisibleReviews] = useState(3);

    const showAllReviews = () => {
        setVisibleReviews((state) => state + 3);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ mode: 'onBlur' });

    const sendReview = ({ text }) => {
        dispatch(addReview({ id: productInfo._id, body: { text, rating: rate } }));
        reset();
        setFormActive(false);
        setRate(3);
    };
    console.log();
    return (
        <div className='product__reviews'>
            <div className='reviews__list'>
                {!!allReviews.length ? (
                    allReviews.slice(0, visibleReviews).map((item) => {
                        return (
                            <div key={item._id} className='reviews__item'>
                                <div className='author__avatar'>
                                    <img src={item.author.avatar} alt='' />
                                </div>
                                <div className='reviews__info'>
                                    <div className='reviews__name-wrap'>
                                        <span className='reviews__name'>
                                            {item.author.name}&#160;
                                        </span>
                                        <span className='reviews__date'>
                                            {new Date(item.created_at).toLocaleString(
                                                'ru-RU',
                                                timeOptions
                                            )}
                                        </span>
                                    </div>
                                    <div className='reviews__rate'>
                                        <Rate rating={item.rating} />
                                    </div>
                                    <div className='reviews__text-wrap'>
                                        <div className='reviews__text'>{item?.text}</div>
                                        {userData._id === item.author._id ? (
                                            <Trash3
                                                className='reviews__trash'
                                                onClick={() =>
                                                    dispatch(deleteReview({ productInfo, item }))
                                                }
                                            />
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div>Станьте первым, оставьте Ваш отзыв!</div>
                )}
                {allReviews?.length - visibleReviews > 0 && (
                    <button
                        className='reviews_btn btn__all_reviews'
                        onClick={() => showAllReviews()}
                    >
                        Показать больше отзывов
                    </button>
                )}
            </div>
            <button className='reviews_btn' onClick={() => setFormActive(!formActive)}>
                Написать отзыв
            </button>
            {formActive && (
                <form className='form__reviews' onSubmit={handleSubmit(sendReview)}>
                    <Rate rating={rate} setRate={setRate} isModify={true} />
                    <div>
                        <textarea
                            type='text'
                            {...register('text', { ...checkingTheField })}
                            placeholder='Ваш отзыв'
                            className='form__reviews_input'
                            rows={3}
                        />
                        {errors?.text && (
                            <span className='errors__span'> {errors?.text.message}</span>
                        )}
                    </div>
                    <button type='submit' className='reviews_btn'>
                        Отправить
                    </button>
                </form>
            )}
        </div>
    );
});

export default ProductReviews;
