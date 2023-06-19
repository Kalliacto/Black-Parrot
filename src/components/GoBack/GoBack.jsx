import React from 'react';
import './goBack.css';
import { useNavigate } from 'react-router-dom';

const GoBack = () => {
    const nav = useNavigate();

    const goBack = () => {
        nav('/catalogPage');
    };

    return (
        <>
            <span className='product__back' onClick={() => goBack()}>
                {'>'} К списку товаров
            </span>
        </>
    );
};

export default GoBack;
