import { Link } from 'react-router-dom';
import '../forms.css';
import React from 'react';

const AuthorizationForm = (props) => {
    return (
        <div className='form__wrapper'>
            <h2 className='form__title'>Вход</h2>
            <form className='form__container'>
                <input type='email' placeholder='Email' className='form__input' />
                <input type='password' placeholder='Пароль' className='form__input' />
                <p className='form__info form__info-right'>Восстановить пароль</p>
                <button type='submit' className='form__btn form__btn-basic'>
                    Войти
                </button>
            </form>
            <Link to='/register' className='form__link'>
                <button className='form__btn'>Регистрация</button>
            </Link>
        </div>
    );
};

export default AuthorizationForm;
