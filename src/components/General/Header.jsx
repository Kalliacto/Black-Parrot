import React from 'react';
import Logo from './Logo';
import './style.css';
import {
    Heart,
    HeartFill,
    Bag,
    BagCheck,
    PersonCircle,
    BuildingUp,
    BuildingDown,
} from 'react-bootstrap-icons';

const Header = ({ user, upd }) => {
    const login = () => {
        localStorage.setItem('user12', 'Vasya');
        upd('Vasya');
    };

    const logout = () => {
        localStorage.removeItem('user12');
        upd('');
    };

    return (
        <>
            <header>
                <Logo />
                <div className="search-block"></div>
                <nav className="header__menu">
                    {user ? (
                        <>
                            <a href="/">
                                <Heart title="Избранное" />
                            </a>
                            <a href="/">
                                <Bag title="Корзина" />
                            </a>
                            <a href="/">
                                <PersonCircle title="Личный кабинет" />
                            </a>
                        </>
                    ) : (
                        ''
                    )}
                    <span>
                        {!user ? (
                            <BuildingUp title="Вход" onClick={login} />
                        ) : (
                            ''
                        )}
                        {user ? (
                            <BuildingDown title="Выход" onClick={logout} />
                        ) : (
                            ''
                        )}
                    </span>
                </nav>
            </header>
        </>
    );
};

export default Header;
