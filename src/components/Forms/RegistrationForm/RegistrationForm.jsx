import { Link } from 'react-router-dom';
import '../forms.css';
import React from 'react';
import { userApi } from '../../../utils/apiUser';
import { useForm } from 'react-hook-form';

const RegistrationForm = (props) => {
    const { register, handleSubmit } = useForm({});

    const sendRegistrData = async (data) => {
        return await userApi.signUp(data).catch((error) => alert('Oooops, что-то пошло не так'));
    };

    return (
        <div className='form__wrapper' onSubmit={handleSubmit(sendRegistrData)}>
            <h2 className='form__title'>Регистрация</h2>
            <form className='form__container'>
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
                <input
                    type='number'
                    {...register('group')}
                    placeholder='group'
                    className='form__input'
                />
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
