import { Link } from 'react-router-dom';
import '../forms.css';
import React from 'react';

const RegistrationForm = (props) => {
    return (
        <div className='form__wrapper'>
            <h2 className='form__title'>Регистрация</h2>
            <form className='form__container'>
                <input type='email' placeholder='Email' className='form__input' />
                <input type='password' placeholder='Пароль' className='form__input' />
                <p className='form__info'>
                    Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и Политикой
                    конфиденциальности и соглашаетесь на информационную рассылку.
                </p>
                <button type='submit' className='form__btn form__btn-basic'>
                    Зарегистрироваться
                </button>
            </form>
            <Link to='/auth' className='form__link'>
                <button className='form__btn'>Войти</button>
            </Link>
        </div>
    );
};

export default RegistrationForm;
