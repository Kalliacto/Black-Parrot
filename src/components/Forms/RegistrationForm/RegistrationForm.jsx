import { Link } from 'react-router-dom';
import '../forms.css';
import React from 'react';
import { userApi } from '../../../utils/apiUser';
import { useForm } from 'react-hook-form';
import {
    checkingTheFillingEmail,
    checkingTheFillingGroup,
    passwordValidationCheck,
} from '../../../utils/utils';

const RegistrationForm = (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onBlur' });

    const sendRegistrData = async (data) => {
        return await userApi.signUp(data).catch((error) => alert('Oooops, что-то пошло не так'));
    };

    return (
        <div className='form__wrapper' onSubmit={handleSubmit(sendRegistrData)}>
            <h2 className='form__title'>Регистрация</h2>
            <form className='form__container'>
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
                <div className='input__wrap'>
                    <input
                        type='number'
                        {...register('group', { ...checkingTheFillingGroup })}
                        placeholder='group'
                        className='form__input'
                    />
                    {errors?.group && (
                        <span className='warning__text'> {errors?.group.message}</span>
                    )}
                </div>
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
