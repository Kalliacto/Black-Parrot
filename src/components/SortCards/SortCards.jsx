import React from 'react';
import './sortCards.css';
import { sortItem } from '../../utils/utils';
import { useDispatch } from 'react-redux';
import { sortingProducts } from '../../store/slices/productsSlice';

const SortCards = () => {
    const dispatch = useDispatch();

    return (
        <div className='sort__cards_wrapper'>
            <div className='sort__cards'>
                {sortItem.map((item) => {
                    return (
                        <span
                            key={item.id}
                            onClick={() => dispatch(sortingProducts(item.id))}
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
