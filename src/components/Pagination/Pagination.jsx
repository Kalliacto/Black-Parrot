import React, { memo, useContext } from 'react';
import './pagination.css';
import { CardContext } from '../../context/cardContext';

const Pagination = memo(({ allCards, paginate }) => {
    const { cardsOnPage, setCurrentPage, currentPage, setCardsOnPage } = useContext(CardContext);
    const pageNumber = [];

    const nextPage = () => {
        if (currentPage + 1 > pageNumber.length) {
            return;
        }
        setCurrentPage((state) => state + 1);
    };

    const prevPage = () => {
        if (currentPage - 1 === 0) {
            return;
        }
        setCurrentPage((state) => state - 1);
    };

    for (let i = 1; i <= Math.ceil(allCards / cardsOnPage); i++) {
        pageNumber.push(i);
    }

    return (
        <div className='pagination__container'>
            <div className='pagination__wrapper'>
                <button
                    className={currentPage !== 1 ? 'pagination__btn' : 'pagination__btn disable'}
                    onClick={prevPage}
                >
                    Назад
                </button>
                <ul className='pagination'>
                    {pageNumber.map((number, i) => (
                        <li
                            key={number}
                            onClick={() => paginate(number)}
                            className={
                                currentPage === i + 1
                                    ? 'pagination__item pagination__item_active'
                                    : 'pagination__item'
                            }
                        >
                            {number}
                        </li>
                    ))}
                </ul>
                <button
                    className={
                        currentPage !== pageNumber.length
                            ? 'pagination__btn'
                            : 'pagination__btn disable'
                    }
                    onClick={nextPage}
                >
                    Вперед
                </button>
            </div>
            <select
                defaultValue={8}
                className='pagination__select'
                onChange={(e) => setCardsOnPage(e.target.value)}
            >
                <option value='4' className='pagination__option'>
                    4
                </option>
                <option value='8' className='pagination__option'>
                    8
                </option>
                <option value='12' className='pagination__option'>
                    12
                </option>
            </select>
        </div>
    );
});

export default Pagination;
