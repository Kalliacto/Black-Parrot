import React, { useContext } from 'react';
import './productView.css';
import GoBack from '../GoBack/GoBack';
import { ReactComponent as Like } from '../Card/img/Like.svg';
import { CardContext } from '../../context/cardContext';
import { api } from '../../utils/api';
import { Truck, Award } from 'react-bootstrap-icons';
import ProductPrice from '../ProductPrice/ProductPrice';
import ProductReviews from '../ProductReviews/ProductReviews';
import { getEndings } from '../../utils/utils';
import Rate from '../Rate/Rate';

const ProductView = ({ productInfo, setProductInfo, id }) => {
    const { card, user, setCards, findFavorite, setFavorite, productRating } =
        useContext(CardContext);

    const cardIsLiked = productInfo.likes ? productInfo.likes.includes(user._id) : false;

    const changeLikeCardOne = async (id, cardIsLiked) => {
        const updateLikeInCard = await api
            .editLikeCard(id, cardIsLiked)
            .catch((error) => console.log(error));

        const newCard = card.map((item) =>
            item._id === updateLikeInCard._id ? updateLikeInCard : item
        );
        setProductInfo(updateLikeInCard);
        setCards([...newCard]);

        const newFavorite = newCard.filter((item) => findFavorite(item, user._id));
        setFavorite(newFavorite);
    };

    const rating = productRating(productInfo);

    return (
        <>
            <div className='product__wrapper'>
                <div className='product__title_wrapper'>
                    <GoBack />
                    <h3 className='product__title'>{productInfo.name}</h3>
                    <div className='product__rating'>
                        <span>Artikul</span>
                        <Rate rate={rating} />
                        <span>
                            {productInfo.reviews?.length}{' '}
                            {getEndings(productInfo.reviews?.length, 'Отзыв')}
                        </span>
                    </div>
                </div>
                <div className='product__content_wrapper'>
                    <div className='product__img_wrapper'>
                        <div className='card__sticky card__sticky_left'>
                            {productInfo.discount ? (
                                <span className='card__discount'>-{productInfo.discount}%</span>
                            ) : (
                                ''
                            )}
                        </div>
                        <div className='card__sticky card__sticky_right'>
                            <button
                                onClick={() => changeLikeCardOne(id, cardIsLiked)}
                                className={`btn__like ${
                                    cardIsLiked ? 'card__like_active' : 'card__like'
                                }`}
                            >
                                <Like />
                            </button>
                        </div>
                        <img className='product__img' src={productInfo.pictures} alt='' />
                    </div>
                    <div className='product__inCart_wrapper'>
                        <ProductPrice productInfo={productInfo} />
                        <div className='product__inCart_btns'>
                            <div className='product__counter_btns'>
                                <p className='btn_minus'>-</p>
                                <span>0</span>
                                <p className='btn_plus'>+</p>
                            </div>
                            <button className='btn_basket'>В корзину</button>
                        </div>
                        <div className='product__delivery'>
                            <Truck width={32} height={32} />
                            <div className='product__text'>
                                <h4>Доставка по всему Миру!</h4>
                                <p>
                                    Доставка курьером — <b>от 399 ₽</b>
                                </p>
                                <p>
                                    Доставка в пункт выдачи — <b>от 199 ₽</b>
                                </p>
                            </div>
                        </div>
                        <div className='product__quality'>
                            <Award className='award' />
                            <div className='product__text'>
                                <h4>Гарантия качества</h4>
                                <p>
                                    Если Вам не понравилось качество нашей продукции, мы вернем
                                    деньги, либо сделаем все возможное, чтобы удовлетворить ваши
                                    нужды.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='product__description'>
                    <span className='product__description_title'>Описание</span>
                    <span>{productInfo.description}</span>
                </div>
                <ProductReviews productInfo={productInfo} />
            </div>
        </>
    );
};

export default ProductView;
