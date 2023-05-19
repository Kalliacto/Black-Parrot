import React from 'react';
import './notFoundComponent.css';
import svg from '../../img/svg.svg';
import { Link } from 'react-router-dom';

const NotFoundComponent = ({ text }) => {
    return (
        <>
            <div className='container'>
                <div className='notFound__wrapper'>
                    <img className='notFound__img' src={svg} alt='sad smile' />
                    <div className='notFound__title'>{text}</div>
                    <Link to={'/'}>
                        <button className='notFound__btn'>На главную</button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default NotFoundComponent;
