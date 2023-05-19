import React from 'react';
import './notFoundProductPage.css';
import NotFoundComponent from '../../components/NotFoundComponent/NotFoundComponent';

const NotFoundProductPage = () => {
    return (
        <>
            <NotFoundComponent text={'Простите, товары по вашему запросу не найдены.'} />
        </>
    );
};

export default NotFoundProductPage;
