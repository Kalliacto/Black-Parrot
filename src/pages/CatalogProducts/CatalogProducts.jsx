import React, { useContext } from 'react';
import { CardList } from '../../components/CardList/CardList';
import './catalogProduct.css';
import SortCards from '../../components/SortCards/SortCards';
import { CardContext } from '../../context/cardContext';

const CatalogProducts = () => {
    const { card, search } = useContext(CardContext);

    const getEndings = (num) => {
        const res = num % 10;
        if (res === 1) {
            return ' товар';
        } else if (1 < res && res < 5) {
            return ' товара';
        } else if (num > 5 || !num) {
            return ' товаров';
        }
    };

    return (
        <>
            {search ? (
                <p className="search__info">
                    По запросу <b>{search}</b>
                    {card.length === 1 ? ' найден' : ' найдено'}{' '}
                    <b>{card.length}</b>
                    {getEndings(card.length)}
                </p>
            ) : (
                ''
            )}
            <SortCards />
            <CardList cards={card} />
        </>
    );
};

export default CatalogProducts;
