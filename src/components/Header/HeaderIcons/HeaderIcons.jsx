import React, { useContext } from 'react';
import './headersIcons.css';
import { ReactComponent as Dog } from './icons/DogIcon.svg';
import { ReactComponent as Heart } from './icons/Favorites.svg';
import { ReactComponent as Cart } from './icons/ic-cart.svg';
import { Link } from 'react-router-dom';
import { CardContext } from '../../../context/cardContext';
import { BoxArrowInLeft, BoxArrowRight } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';

const HeaderIcons = () => {
    const { setActiveModal, setHaveTokenAuth, haveTokenAuth } = useContext(CardContext);

    const { favoritesCards } = useSelector((s) => s.products);

    const logOut = () => {
        localStorage.removeItem('token');
        return setHaveTokenAuth(false);
    };

    return (
        <div className='header__icons'>
            {haveTokenAuth ? (
                <>
                    <div title='В избранное'>
                        <Link className='header__heart' to={'/favorite'}>
                            <Heart />
                            {favoritesCards.length !== 0 ? (
                                <span className='header__icons_bubble'>
                                    {favoritesCards.length}
                                </span>
                            ) : (
                                ''
                            )}
                        </Link>
                    </div>
                    <div title='В корзину'>
                        <Link>
                            <Cart />
                        </Link>
                    </div>{' '}
                    <Link to={`/profile`}>
                        <Dog title='Профиль' />
                    </Link>
                    <BoxArrowRight onClick={() => logOut()} title='Выход' className='log__icon' />
                </>
            ) : (
                <div>
                    <Link to={'/auth'} onClick={() => setActiveModal(true)} title='Вход'>
                        <BoxArrowInLeft className='log__icon' />
                    </Link>
                </div>
            )}
        </div>
    );
};

export default HeaderIcons;
