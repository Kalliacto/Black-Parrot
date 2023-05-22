import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './profilePage.css';
import GoBack from '../../components/GoBack/GoBack';
import { userApi } from '../../utils/apiUser';

const ProfilePage = () => {
    const { userId } = useParams();
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        userApi
            .getUserInfoById(userId)
            .then((userData) => {
                setUserInfo(userData);
            })
            .catch((error) => console.log(error));
    }, [userId]);

    console.log({ userInfo });

    return (
        <div className='profile__container'>
            <GoBack />
            <h2 className='profile__title'>Профиль</h2>
        </div>
    );
};

export default ProfilePage;
