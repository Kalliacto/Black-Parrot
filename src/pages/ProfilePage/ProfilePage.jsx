import React, { useEffect, useState } from 'react';
import './profilePage.scss';
import GoBack from '../../components/GoBack/GoBack';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUser } from '../../store/slices/userSlice';

const ProfilePage = () => {
    const { userData, isLoading } = useSelector((s) => s.user);
    const dispatch = useDispatch();
    const [formActive, setFormActive] = useState(false);
    const { register, handleSubmit } = useForm({
        defaultValues: { name: userData.name, about: userData.about },
    });

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const sendData = (data) => {
        dispatch(updateUser(data));
    };

    return (
        <div className='profile__container'>
            <GoBack />
            <h2 className='profile__title'>Профиль</h2>
            {isLoading ? (
                <div className='profile__info preload'></div>
            ) : (
                <div className='profile__info'>
                    <div className='avatar__wrap'>
                        <img src={userData?.avatar} alt='avatar' className='avatar__img' />
                    </div>
                    <div className='profile__info_detail'>
                        <p className='profile__name'>{userData.name}</p>
                        <span className='profile__contact'>{userData.about}</span>
                        <span className='profile__contact'>{userData.email}</span>
                    </div>
                </div>
            )}
            <button onClick={() => setFormActive(!formActive)} className='profile_btn'>
                Изменить
            </button>
            {formActive && (
                <>
                    <form className='profile__form' onSubmit={handleSubmit(sendData)}>
                        <h4>Мои данные</h4>
                        <input
                            type='text'
                            {...register('name')}
                            placeholder='Имя'
                            className='profile__form_input'
                        />
                        <input
                            type='about'
                            {...register('about')}
                            className='profile__form_input'
                            placeholder='Обо мне'
                        />
                        <input
                            type='avatar'
                            {...register('avatar')}
                            className='profile__form_input'
                            placeholder='Ваш новый аватар'
                        />
                        <button type='submit' className='profile_btn'>
                            Сохранить
                        </button>
                    </form>
                </>
            )}
        </div>
    );
};

export default ProfilePage;
