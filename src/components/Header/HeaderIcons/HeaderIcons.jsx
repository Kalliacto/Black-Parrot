import React, { useContext } from 'react';
import './headersIcons.css';
import { ReactComponent as Heart } from './icons/Favorites.svg';
import { ReactComponent as Cart } from './icons/ic-cart.svg';
import { ReactComponent as Bird } from './icons/697561-200 (1).svg';
import { Link, useNavigate } from 'react-router-dom';
import { CardContext } from '../../../context/cardContext';
import { BoxArrowInLeft, BoxArrowRight } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';

const HeaderIcons = () => {
    const { setActiveModal, setHaveTokenAuth, haveTokenAuth } = useContext(CardContext);
    const navigate = useNavigate();
    const { favoritesCards } = useSelector((s) => s.products);

    const logOut = () => {
        localStorage.removeItem('token');
        navigate('/auth');
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
                        <Bird title='Профиль' />
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
