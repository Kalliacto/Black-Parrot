import React, { useContext, useEffect, useState } from 'react';
import ProductView from '../../components/ProductView/ProductView';
import { useParams } from 'react-router-dom';
import { editLikeCard, getOneProduct } from '../../utils/api';
import { CardContext } from '../../context/cardContext';
import GoBack from '../../components/GoBack/GoBack';
import { ReactComponent as Like } from '../../components/Card/img/Like.svg';
import './pageProduct.css';

const PageProduct = () => {
    const [productInfo, setProductInfo] = useState({});
    const { id } = useParams();

    useEffect(() => {
        getOneProduct(id).then((data) => setProductInfo(data));
    }, [id]);

    return (
        <>
            <ProductView
                productInfo={productInfo}
                setProductInfo={setProductInfo}
                id={id}
            />
        </>
    );
};

export default PageProduct;
