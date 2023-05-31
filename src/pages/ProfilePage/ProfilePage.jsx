import React, { useContext, useEffect, useState } from 'react';
import './profilePage.css';
import GoBack from '../../components/GoBack/GoBack';
import { userApi } from '../../utils/apiUser';
import { useForm } from 'react-hook-form';
import { CardContext } from '../../context/cardContext';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../store/slices/userSlice';

const ProfilePage = () => {
    const [formActive, setFormActive] = useState(false);
    const { user, setUser } = useContext(CardContext);
    const { register, handleSubmit } = useForm({
        defaultValues: { name: user.name, about: user.about },
    });

    const dispatch = useDispatch();
    const { data } = useSelector((s) => s.user);

    console.log(data);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const sendData = async (data) => {
        return await userApi
            .changingDataUser(data)
            .then((dataUser) => setUser({ ...dataUser }))
            .catch((err) => alert(err));
    };

    return (
        <div className='profile__container'>
            <GoBack />
            <h2 className='profile__title'>Профиль</h2>
            <div className='profile__info'>
                <div className='avatar__wrap'>
                    <img src={data?.avatar} alt='avatar' className='avatar__img' />
                </div>
                <div className='profile__info_detail'>
                    <p className='profile__name'>{user.name}</p>
                    <span className='profile__contact'>{user.about}</span>
                    <span className='profile__contact'>{user.email}</span>
                </div>
            </div>
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
                            className='form__profile_input'
                        />
                        <input
                            type='about'
                            {...register('about')}
                            className='form__profile_input'
                            placeholder='Обо мне'
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
