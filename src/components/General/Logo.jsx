import React from 'react';
import logoImg from '../../assents/images/logo.svg';

const Logo = (props) => {
    return (
        <a className="logo" href="/">
            <img src={logoImg} className="logo__pic" alt="Logo"></img>
            <span className="logo__text">DogFood</span>
        </a>
    );
};

export default Logo;
