import React from 'react';
import svg from './svg.svg';
import './notfoundpage.css';

const NotFoundPage = (props) => {
    return (
        <>
            <div className="container">
                <div className="notFoundPage__wrapper">
                    <img
                        className="notFoundPage__img"
                        src={svg}
                        alt="sad smile"
                    />
                    <h2 className="notFoundPage__title">
                        Простите, данная страница не найдена.
                    </h2>
                    <button className="notFoundPage__btn">На главную</button>
                </div>
            </div>
        </>
    );
};

export default NotFoundPage;
