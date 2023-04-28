import React from 'react';
import './headersIcons.css';
import { ReactComponent as Dog } from './icons/DogIcon.svg';
import { ReactComponent as Heart } from './icons/Favorites.svg';
import { ReactComponent as Cart } from './icons/ic-cart.svg';
import { Link } from 'react-router-dom';

const HeaderIcons = (props) => {
    return (
        <div className="header__icons">
            <div>
                <Link to={'/favorite'}>
                    <Heart />
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
