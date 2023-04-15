import React from 'react';
import logoImg from '../../assents/images/logo.svg';
import './style.css';

const Logo = (props) => {
    return (
        <a className="logo" href="/">
            <img src={logoImg} className="logo__pic" alt="Logo"></img>
        </a>
    );
};

export default Logo;
