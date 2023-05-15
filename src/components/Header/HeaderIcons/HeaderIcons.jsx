import React, { useContext } from 'react';
import './headersIcons.css';
import { ReactComponent as Dog } from './icons/DogIcon.svg';
import { ReactComponent as Heart } from './icons/Favorites.svg';
import { ReactComponent as Cart } from './icons/ic-cart.svg';
import { Link } from 'react-router-dom';
import { CardContext } from '../../../context/cardContext';

const HeaderIcons = () => {
    const { favorites, setActiveModal } = useContext(CardContext);

    return (
        <div className='header__icons'>
            <div title='В избранное'>
                <Link className='header__heart' to={'/favorite'}>
                    <Heart />
                    {favorites.length !== 0 ? (
                        <span className='header__icons_bubble'>{favorites.length}</span>
                    ) : (
                        ''
                    )}
                </Link>
            </div>
            <div title='В корзину'>
                <Link>
                    <Cart />
                </Link>
            </div>
            <div title='Профиль'>
                <Link to={'/auth'} onClick={() => setActiveModal(true)}>
                    <Dog />
                </Link>
            </div>
        </div>
    );
};

export default HeaderIcons;
