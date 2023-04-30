import React, { useContext, useEffect, useState } from 'react';
import ProductView from '../../components/ProductView/ProductView';
import { useParams } from 'react-router-dom';
import { getOneProduct } from '../../utils/api';
import { CardContext } from '../../context/cardContext';
import GoBack from '../../components/GoBack/GoBack';
import { ReactComponent as Like } from '../../components/Card/img/Like.svg';
import './pageProduct.css';

const PageProduct = () => {
    const { user, changeLikeCard } = useContext(CardContext);
    const [productInfo, setProductInfo] = useState({});
    const { id } = useParams();

    useEffect(() => {
        getOneProduct(id).then((data) => setProductInfo(data));
    }, [id]);

    console.log({ productInfo });

    return (
        <>
            <div className="product__wrapper">
                <div className="product__title_wrapper">
                    <GoBack />
                    <h3 className="product__title">{productInfo.name}</h3>
                    <div className="product__rating">
                        <span>Artikul</span>
                        <span>Rate</span>
                    </div>
                </div>
                <div className="product__img_wrapper">
                    <div className="card__sticky card__sticky_left">
                        {productInfo.discount ? (
                            <span className="card__discount">
                                -{productInfo.discount}%
                            </span>
                        ) : (
                            ''
                        )}
                    </div>
                    <div className="card__sticky card__sticky_right">
                        <button
                            onClick={() => {
                                console.log('click');
                            }}
                            className={`btn__like ${
                                productInfo.likes
                                    ? 'card__like_active'
                                    : 'card__like'
                            }`}
                        >
                            <Like />
                        </button>
                    </div>
                    <img
                        className="product__img"
                        src={productInfo.pictures}
                        alt=""
                    />
                </div>
                <div className="product__description">
                    <span className="product__description_price">
                        {productInfo.price}&nbsp;₽
                    </span>
                </div>
                <div className="product__description">
                    <span className="product__description_title">Описание</span>
                    <span>{productInfo.description}</span>
                </div>
            </div>
        </>
    );
};

export default PageProduct;
