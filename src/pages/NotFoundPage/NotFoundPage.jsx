import React from 'react';
import './notfoundpage.css';
import NotFoundComponent from '../../components/NotFoundComponent/NotFoundComponent';

const NotFoundPage = (props) => {
    return (
        <>
            <NotFoundComponent text={'Простите, данная страница не найдена.'} />
        </>
    );
};

export default NotFoundPage;
