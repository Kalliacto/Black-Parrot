import { Link } from 'react-router-dom';
import '../forms.css';
import React from 'react';
import { useForm } from 'react-hook-form';
import { userApi } from '../../../utils/apiUser';

const AuthorizationForm = (props) => {
    const { register, handleSubmit } = useForm({});

    const sendAuthData = async (data) => {
        return await userApi
            .signIn(data)
            .then((res) => localStorage.setItem('token', res.token))
            .catch((error) => alert('Oooops, что-то пошло не так'));
    };

    return (
        <div className='form__wrapper'>
            <h2 className='form__title'>Вход</h2>
            <form className='form__container' onSubmit={handleSubmit(sendAuthData)}>
                <input
                    type='email'
                    {...register('email')}
                    placeholder='Email'
                    className='form__input'
                />
                <input
                    type='password'
                    {...register('password')}
                    placeholder='Пароль'
                    className='form__input'
                />
                <Link to='/newPass' className='form__info-right'>
                    <p className='form__info'>Восстановить пароль</p>
                </Link>
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
