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
            {!!Object.keys(productInfo).length ? (
                <ProductView productInfo={productInfo} setProductInfo={setProductInfo} id={id} />
            ) : (
                <div>Loading....</div>
            )}
        </>
    );
};

export default PageProduct;
