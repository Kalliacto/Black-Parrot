import { Link } from 'react-router-dom';
import '../forms.css';
import React from 'react';
import { useForm } from 'react-hook-form';
import { userApi } from '../../../utils/apiUser';
import { checkingTheFillingEmail, passwordValidationCheck } from '../../../utils/utils';

const AuthorizationForm = (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onBlur' });

    const sendAuthData = async (data) => {
        return await userApi
            .signIn(data)
            .then((res) => localStorage.setItem('token', res.token))
            .catch((error) => alert('Oooops, ' + error));
    };

    return (
        <div className='form__wrapper'>
            <h2 className='form__title'>Вход</h2>
            <form className='form__container' onSubmit={handleSubmit(sendAuthData)}>
                <div className='input__wrap'>
                    <input
                        type='email'
                        {...register('email', { ...checkingTheFillingEmail })}
                        placeholder='Email'
                        className='form__input'
                    />
                    {errors?.email && (
                        <span className='warning__text'> {errors?.email.message}</span>
                    )}
                </div>
                <div className='input__wrap'>
                    <input
                        type='password'
                        {...register('password', { ...passwordValidationCheck })}
                        placeholder='Пароль'
                        className='form__input'
                    />
                    {errors?.password && (
                        <span className='warning__text'> {errors?.password.message}</span>
                    )}
                </div>
                <Link to='/newPass' className='form__info-right'>
                    <p className='form__info'>Восстановить пароль</p>
                </Link>
                <button type='submit' className='form__btn form__btn-basic'>
                    Войти
                </button>
            </form>
            <Link to='/register' className='form__link'>
                <button className='form__btn'>Зарегистрироваться</button>
            </Link>
        </div>
    );
};

export default AuthorizationForm;
