import React from 'react';
import './headersIcons.css';
import { ReactComponent as Dog } from './icons/DogIcon.svg';
import { ReactComponent as Heart } from './icons/Favorites.svg';
import { ReactComponent as Cart } from './icons/ic-cart.svg';

const HeaderIcons = (props) => {
    return (
        <div className="header__icons">
            <div>
                <Heart />
            </div>
            <div>
                <Cart />
            </div>
            <div>
                <Dog />
            </div>
        </div>
    );
};

export default HeaderIcons;
