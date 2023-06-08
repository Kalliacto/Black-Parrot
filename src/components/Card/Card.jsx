import React from 'react';
import './card.css';
import { ReactComponent as Like } from './img/Like.svg';
import { Link } from 'react-router-dom';
import ProductPrice from '../ProductPrice/ProductPrice';
import { useDispatch, useSelector } from 'react-redux';
import { changingLikeOnProductCards } from '../../store/slices/productsSlice';

const Card = React.memo(({ product }) => {
    const { userData } = useSelector((s) => s.user);
    const dispatch = useDispatch();

    const cardLiked = product.likes.some((item) => item === userData._id);

    return (
        <div className='card'>
            <div className='card__sticky card__sticky_left'>
                {product.discount ? (
                    <span className='card__discount'>-{product.discount}%</span>
                ) : (
                    ''
                )}
                {product.tags.map((item, index) => (
                    <span className={`tag tag_type_${item}`} key={index}>
                        {item}
                    </span>
                ))}
            </div>
            <div className='card__sticky card__sticky_right'>
                <button
                    onClick={() => {
                        dispatch(changingLikeOnProductCards({ product, cardLiked: cardLiked }));
                    }}
                    className={`btn__like ${cardLiked ? 'card__like_active' : 'card__like'}`}
                >
                    <Like />
                </button>
            </div>
            <Link to={`/product/${product._id}`} className='card__link'>
                <div className='card__image_wrapper'>
                    <img className='card__image' src={product.pictures} alt='food' />
                </div>
                <div className='card__description'>
                    <ProductPrice productInfo={product} />
                    <span className='card__weight'>{product.wight}</span>
                    <p className='card__text'>
                        {product.name.length >= 20
                            ? product.name.slice(0, 60) + '...'
                            : product.name}
                    </p>
                </div>
            </Link>
            <button className='card__btn btn_color'>В Корзину</button>
        </div>
    );
});

export default Card;
