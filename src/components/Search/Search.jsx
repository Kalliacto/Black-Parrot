import React, { useContext } from 'react';
import s from './search.module.css';
import { XCircle } from 'react-bootstrap-icons';
import { CardContext } from '../../context/cardContext';

const Search = ({ setSearch }) => {
    const { search } = useContext(CardContext);
    return (
        <div className={s.search}>
            <input
                className={s.search__input}
                placeholder='Поиск...'
                onChange={(e) => setSearch(e.target.value)}
            />
            {!!search && (
                <XCircle
                    className={s.search__icon}
                    onClick={(e) => {
                        console.log(e.target.previousElementSibling.value);
                        e.currentTarget.previousElementSibling.value = '';
                        setSearch('');
                    }}
                />
            )}
        </div>
    );
};

export default Search;
