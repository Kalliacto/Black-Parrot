import { Link } from 'react-router-dom';
import '../forms.css';

import React from 'react';

const PasswordRecoveryForm = (props) => {
    return (
        <div className='form__wrapper'>
            <h2 className='form__title'>Восстановление пароля</h2>
            <form className='form__container'>
                <p className='form__info'>
                    Для получения временного пароля необходимо ввести email, указанный при
                    регистрации.
                </p>
                <input type='email' placeholder='Email' className='form__input' />
                <p className='form__info'>Срок действия временного пароля 24 ч.</p>
                <button type='submit' className='form__btn form__btn-basic'>
                    Отправить
                </button>
            </form>
            <Link to='/auth'>
                <button className='form__btn'>Авторизация</button>
            </Link>
        </div>
    );
};

export default PasswordRecoveryForm;
