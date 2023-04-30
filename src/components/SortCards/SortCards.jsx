import React, { useContext } from 'react';
import './sortCards.css';
import { CardContext } from '../../context/cardContext';

const SortCards = () => {
    const { onSort } = useContext(CardContext);
    const sortItem = [
        { id: 'all', title: 'Все товары' },
        { id: 'popular', title: 'Популярные' },
        { id: 'new', title: 'Новинки' },
        { id: 'lowPrice', title: 'Сначала дешёвые' },
        { id: 'highPrice', title: 'Сначала дорогие' },
        // { id: 'rate', title: 'По рейтингу' } запланировано на будущее, рэйтинг не проходили еще  ,
        { id: 'sale', title: 'По скидке' },
    ];
    return (
        <div className="sort__cards_wrapper">
            <div className="sort__cards">
                {sortItem.map((item) => {
                    return (
                        <span
                            key={item.id}
                            onClick={() => onSort(item.id)}
                            className="sort__cards_text"
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
