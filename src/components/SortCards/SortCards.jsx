import React, { useContext } from 'react';
import './sortCards.css';
import { CardContext } from '../../context/cardContext';

const SortCards = () => {
    const { onSort } = useContext(CardContext);
    const sortItem = [
        { id: 'popular', title: 'Популярные' },
        { id: 'newProduct', title: 'Новинки' },
        { id: 'lowPrice', title: 'Сначала дешёвые' },
        { id: 'highPrice', title: 'Сначала дорогие' },
        { id: 'sale', title: 'По скидке' },
        { id: 'rate', title: 'По рейтингу' },
    ];
    return (
        <div className='sort__cards_wrapper'>
            <div className='sort__cards'>
                {sortItem.map((item) => {
                    return (
                        <span
                            key={item.id}
                            onClick={() => onSort(item.id)}
                            className='sort__cards_text'
                        >
                            {item.title}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export default SortCards;
