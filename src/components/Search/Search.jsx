import React from 'react';
import s from './search.module.css';
import { XCircle } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../../store/slices/productsSlice';

const Search = () => {
    const { search } = useSelector((s) => s.products);
    const dispatch = useDispatch();

    return (
        <div className={s.search}>
            <input
                className={s.search__input}
                placeholder='Поиск...'
                onChange={(e) => dispatch(setSearch(e.target.value))}
            />
            {!!search && (
                <XCircle
                    className={s.search__icon}
                    onClick={(e) => {
                        e.currentTarget.previousElementSibling.value = '';
                        dispatch(setSearch(null));
                    }}
                />
            )}
        </div>
    );
};

export default Search;
