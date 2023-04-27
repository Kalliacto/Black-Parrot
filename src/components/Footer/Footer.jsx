import React from 'react';
import './footer.css';
import Logo from '../Logo/Logo';

const links = [
    { name: 'Каталог', href: '/' },
    { name: 'Акции', href: '/' },
    { name: 'Новости', href: '/' },
    { name: 'Отзывы', href: '/' },
];

const linksTwo = [
    { name: 'Оплата и доставка', href: '/' },
    { name: 'Часто спрашивают', href: '/' },
    { name: 'Обратная связь', href: '/' },
    { name: 'Контакты', href: '/' },
];

export const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="container">
                    <div className="footer__wrapper">
                        <div className="footer__copy">
                            <Logo />
                            <span>
                                © «Интернет-магазин BlackParrot.ru»{' '}
                                {new Date().getFullYear()}
                            </span>
                        </div>
                        <nav className="footer__nav">
                            <ul className="footer__menu">
                                {links.map((el) => {
                                    return (
                                        <li
                                            key={el.name}
                                            className="footer__item"
                                        >
                                            <a href={el.src}>{el.name}</a>
                                        </li>
                                    );
                                })}
                            </ul>
                            <ul className="footer__menu">
                                {linksTwo.map((el) => {
                                    return (
                                        <li
                                            key={el.name}
                                            className="footer__item"
                                        >
                                            <a href={el.href}>{el.name}</a>
                                        </li>
                                    );
                                })}
                            </ul>
                            <ul className="footer__menu">
                                <li className="footer__item">
                                    <h3>Мы на связи</h3>
                                </li>
                                <li className="footer__item">
                                    <h3>8 (999) 00-00-00</h3>
                                    <span>blackparrot.ru@gmail.com</span>
                                </li>
                                <ul className="icon__wrapper">
                                    <li className="icon telegram-icon">
                                        <a href="/"></a>
                                    </li>
                                    <li className="icon whatsapp-icon">
                                        <a href="/"></a>
                                    </li>
                                    <li className="icon viber-icon">
                                        <a href="/"></a>
                                    </li>
                                    <li className="icon instagram-icon">
                                        <a href="/"></a>
                                    </li>
                                    <li className="icon vk-icon">
                                        <a href="/"></a>
                                    </li>
                                </ul>
                            </ul>
                        </nav>
                    </div>
                </div>
            </footer>
        </>
    );
};
