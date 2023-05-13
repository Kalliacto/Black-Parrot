import React, { useEffect, useState } from 'react';
import ProductView from '../../components/ProductView/ProductView';
import { useParams } from 'react-router-dom';
import { api } from '../../utils/api';
import './pageProduct.css';

const PageProduct = () => {
    const [productInfo, setProductInfo] = useState({});
    const { id } = useParams();

    useEffect(() => {
        api.getOneProduct(id).then((data) => setProductInfo(data));
    }, [id]);

    return (
        <>
            <ProductView productInfo={productInfo} setProductInfo={setProductInfo} id={id} />
        </>
    );
};

export default PageProduct;
