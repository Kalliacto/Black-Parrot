import React, { useContext } from 'react';
import './headersIcons.css';
import { ReactComponent as Heart } from './icons/Favorites.svg';
import { ReactComponent as Cart } from './icons/ic-cart.svg';
import { ReactComponent as Bird } from './icons/697561-200 (1).svg';
import { Link } from 'react-router-dom';
import { CardContext } from '../../../context/cardContext';
import { BoxArrowInLeft, BoxArrowRight } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuth } from '../../../store/slices/userSlice';

const HeaderIcons = () => {
    const { setActiveModal } = useContext(CardContext);
    const { favoritesCards } = useSelector((s) => s.products);
    const { isAuth } = useSelector((s) => s.user);
    const { basketProducts } = useSelector((s) => s.basket);
    const dispatch = useDispatch();

    const logOut = () => {
        localStorage.removeItem('tokenParrot');
        dispatch(setIsAuth(false));
    };

    return (
        <div className='header__icons'>
            {isAuth ? (
                <>
                    <div title='В избранное'>
                        <Link className='header__icon' to={'/favorite'}>
                            <Heart />
                            {favoritesCards?.length !== 0 ? (
                                <span className='header__icons_bubble'>
                                    {favoritesCards?.length}
                                </span>
                            ) : (
                                ''
                            )}
                        </Link>
                    </div>
                    <div title='В корзину'>
                        <Link to={'/basket'} className='header__icon'>
                            {basketProducts?.length !== 0 ? (
                                <span className='header__icons_bubble'>
                                    {basketProducts?.length}
                                </span>
                            ) : (
                                ''
                            )}
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
