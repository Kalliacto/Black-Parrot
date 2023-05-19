import React, { useContext } from 'react';
import './favoritePage.css';
import GoBack from '../../components/GoBack/GoBack';
import { CardList } from '../../components/CardList/CardList';
import { CardContext } from '../../context/cardContext';
import NotFoundComponent from '../../components/NotFoundComponent/NotFoundComponent';

const FavoritePage = () => {
    const { favorites } = useContext(CardContext);

    return (
        <div className='favorite__wrapper'>
            <GoBack />
            {favorites.length !== 0 ? (
                <>
                    <h2 className='favorite__title'>Избранное</h2>
                    <div></div>
                    <CardList cards={favorites} />
                </>
            ) : (
                <NotFoundComponent
                    text={
                        <div className='notFoundFavorite__container'>
                            <h3 className='notFoundFavorite__title'>
                                В Избранном пока ничего нет️
                            </h3>
                            <p className='notFoundFavorite__text'>
                                Добавляйте товары в Избранное с помощью ❤️️
                            </p>
                        </div>
                    }
                />
            )}
        </div>
    );
};

export default FavoritePage;
