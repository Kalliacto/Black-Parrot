import React, { useEffect, useState } from 'react';
import './productView.css';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getOneProduct } from '../../utils/api';

const ProductView = () => {
    const [productInfo, setProductInfo] = useState({});
    const { id } = useParams();
    const nav = useNavigate();

    useEffect(() => {
        getOneProduct(id).then((data) => setProductInfo(data));
    }, [id]);

    const goBack = () => {
        nav('/');
    };
    // const location = useLocation();
    // console.log({ location });

    return (
        <div className="container">
            <div className="product__wrapper">
                <div className="product__title_wrapper">
                    {/* Либо обернуть в линк, либо f() через useNavigate */}
                    {/* <Link to="/"> */}
                    <span
                        className="product__info_back"
                        onClick={() => goBack()}
                    >
                        К списку товаров
                    </span>
                    {/* </Link> */}
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
        </div>
    );
};

export default ProductView;
