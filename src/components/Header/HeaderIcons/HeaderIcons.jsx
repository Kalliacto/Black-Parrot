import React, { useContext } from 'react';
import './headersIcons.css';
import { ReactComponent as Dog } from './icons/DogIcon.svg';
import { ReactComponent as Heart } from './icons/Favorites.svg';
import { ReactComponent as Cart } from './icons/ic-cart.svg';
import { Link } from 'react-router-dom';
import { CardContext } from '../../../context/cardContext';

const HeaderIcons = () => {
    const { favorites } = useContext(CardContext);
    return (
        <div className="header__icons">
            <div>
                <Link className="header__heart" to={'/favorite'}>
                    <Heart />
                    {favorites.length !== 0 ? (
                        <span className="header__icons_bubble">
                            {favorites.length}
                        </span>
                    ) : (
                        ''
                    )}
                </Link>
            </div>
            <div>
                <Link>
                    <Cart />
                </Link>
            </div>
            <div>
                <Link>
                    <Dog />
                </Link>
            </div>
        </div>
    );
};

export default HeaderIcons;
