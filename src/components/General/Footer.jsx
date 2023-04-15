import React from 'react';
import Logo from './Logo';
import './style.css';

const links = [
    { name: 'Каталог товаров', src: '/' },
    { name: 'Избранное', src: '/' },
    { name: 'Корзина', src: '/' },
];

const Footer = (props) => {
    return (
        <>
            <footer>
                <div className="footer__copy">
                    <Logo />
                    <span>©{new Date().getFullYear()}</span>
                </div>
                <ul className="footer__nav">
                    {links.map((el) => {
                        return (
                            <li key={el.name}>
                                <a href={el.src}>{el.name}</a>
                            </li>
                        );
                    })}
                </ul>
            </footer>
        </>
    );
};

export default Footer;
