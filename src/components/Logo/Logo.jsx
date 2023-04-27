import React from 'react';
import { ReactComponent as LogoSvg } from './logo.svg';
import './logo.css';
import { Link } from 'react-router-dom';

const Logo = (props) => {
    return (
        <Link to="/">
            <LogoSvg className="logo" />
        </Link>
    );
};

export default Logo;
