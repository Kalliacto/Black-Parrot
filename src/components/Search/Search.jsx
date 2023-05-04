import React from 'react';
import s from './search.module.css';

const Search = ({ setSearch }) => {
    return (
        <div className={s.search}>
            <input
                className={s.search__input}
                placeholder="Поиск..."
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    );
};

export default Search;
