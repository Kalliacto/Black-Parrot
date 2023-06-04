import React, { useEffect, useState } from 'react';
import ProductView from '../../components/ProductView/ProductView';
import { useParams } from 'react-router-dom';
import { api } from '../../utils/api';
import './pageProduct.css';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoOneProduct, getProductAllReviewsInfo } from '../../store/slices/oneProductSlice';

const PageProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product: productInfo } = useSelector((s) => s.oneProduct);

    useEffect(() => {
        dispatch(getInfoOneProduct(id)).then(() => dispatch(getProductAllReviewsInfo(id)));
    }, [id]);

    return (
        <>
            {!!Object.keys(productInfo).length ? (
                <ProductView productInfo={productInfo} id={id} />
            ) : (
                <div>Loading....</div>
            )}
        </>
    );
};

export default PageProduct;
