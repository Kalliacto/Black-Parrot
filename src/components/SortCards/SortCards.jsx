import React, { useContext } from 'react';
import './sortCards.css';
import { CardContext } from '../../context/cardContext';
import { sortItem } from '../../utils/utils';

const SortCards = () => {
    const { onSort } = useContext(CardContext);

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
