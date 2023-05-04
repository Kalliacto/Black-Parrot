import React from 'react';
import svg from '../NotFoundPage/svg.svg';
import './notFoundProductPage.css';
import { Link, NavLink } from 'react-router-dom';

const NotFoundProductPage = ({ search, setSearch }) => {
    return (
        <>
            <div className="container">
                <div className="notFoundProductPage__wrapper">
                    <img
                        className="notFoundProductPage__img"
                        src={svg}
                        alt="sad smile"
                    />
                    <h2 className="notFoundProductPage__title">
                        Простите, товары по вашему запросу не найдены.
                    </h2>
                    <Link to={'/'}>
                        <button
                            className="notFoundProductPage__btn"
                            onClick={() => {
                                setSearch('') && <NavLink to="/"></NavLink>;
                            }}
                        >
                            На главную
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default NotFoundProductPage;
