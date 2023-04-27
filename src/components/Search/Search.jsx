import React from 'react';
// import './search.css';
import s from './search.module.css';

const Search = ({ setSearch }) => {
    return (
        <div className={s.search}>
            <input
                className={s.search__input}
                placeholder="Поиск..."
                onChange={(e) => setSearch(e.target.value)}
            />
            {/* <i class="fas fa-search" className={s.search__icon}></i> */}
        </div>
    );
};

export default Search;
