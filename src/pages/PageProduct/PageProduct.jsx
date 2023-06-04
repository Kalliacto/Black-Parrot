import React, { useEffect } from 'react';
import ProductView from '../../components/ProductView/ProductView';
import { useParams } from 'react-router-dom';
import './pageProduct.css';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoOneProduct, getProductAllReviewsInfo } from '../../store/slices/oneProductSlice';

const PageProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product: productInfo, isLoading } = useSelector((s) => s.oneProduct);

    useEffect(() => {
        dispatch(getInfoOneProduct(id)).then(() => dispatch(getProductAllReviewsInfo(id)));
    }, [id]);

    return (
        <>
            {isLoading ? (
                <div className='preload productView__preload'></div>
            ) : (
                <ProductView productInfo={productInfo} />
            )}
        </>
    );
};

export default PageProduct;
