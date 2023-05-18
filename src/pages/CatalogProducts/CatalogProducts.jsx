import React, { useContext } from 'react';
import { CardList } from '../../components/CardList/CardList';
import './catalogProduct.css';
import SortCards from '../../components/SortCards/SortCards';
import { CardContext } from '../../context/cardContext';
import { getEndings } from '../../utils/utils';

const CatalogProducts = () => {
    const { card, search } = useContext(CardContext);

    return (
        <>
            {search ? (
                <p className='search__info'>
                    По запросу <b>{search}</b>
                    {card.length === 1 ? ' найден' : ' найдено'} <b>{card.length}</b>
                    {getEndings(card.length, 'товар')}
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
