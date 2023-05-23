import React from 'react';
import './footer.css';
import Logo from '../Logo/Logo';
import { NavLink } from 'react-router-dom';

const links = [
    { name: 'Каталог', href: '/' },
    { name: 'Акции', href: '/stocks' },
    { name: 'Новости', href: '/news' },
    { name: 'Отзывы', href: '/reviews' },
];

const linksTwo = [
    { name: 'Оплата и доставка', href: '/delivery' },
    { name: 'Часто спрашивают', href: '/faq' },
    { name: 'Обратная связь', href: '/feedback' },
    { name: 'Контакты', href: '/contacts' },
];

export const Footer = React.memo(() => {
    return (
        <>
            <footer className='footer'>
                <div className='container'>
                    <div className='footer__wrapper'>
                        <div className='footer__copy'>
                            <Logo />
                            <span>
                                © «Интернет-магазин BlackParrot.ru» {new Date().getFullYear()}
                            </span>
                        </div>
                        <nav className='footer__nav'>
                            <ul className='footer__menu'>
                                {links.map((el) => {
                                    return (
                                        <li key={el.name} className='footer__item'>
                                            <NavLink to={el.href}>{el.name}</NavLink>
                                        </li>
                                    );
                                })}
                            </ul>
                            <ul className='footer__menu'>
                                {linksTwo.map((el) => {
                                    return (
                                        <li key={el.name} className='footer__item'>
                                            <NavLink to={el.href}>{el.name}</NavLink>
                                        </li>
                                    );
                                })}
                            </ul>
                            <ul className='footer__menu'>
                                <li className='footer__item'>
                                    <h3>Мы на связи</h3>
                                </li>
                                <li className='footer__item'>
                                    <h3>
                                        <a href='tel:+7999000000'>8 (999) 00-00-00</a>{' '}
                                    </h3>
                                    <span>
                                        <a href='mailto:blackparrot.ru@gmail.com'>
                                            blackparrot.ru@gmail.com
                                        </a>{' '}
                                    </span>
                                </li>
                                <ul className='icon__wrapper'>
                                    <li className='icon telegram-icon'></li>
                                    <li className='icon whatsapp-icon'></li>
                                    <li className='icon viber-icon'></li>
                                    <li className='icon instagram-icon'></li>
                                    <li className='icon vk-icon'></li>
                                </ul>
                            </ul>
                        </nav>
                    </div>
                </div>
            </footer>
        </>
    );
});
