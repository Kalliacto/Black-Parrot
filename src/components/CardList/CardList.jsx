import React from 'react';
import './cardList.css';
import Card from '../Card/Card';
// import { useSelector } from 'react-redux';

export const CardList = ({ cards }) => {
    // const { data } = useSelector((s) => s.products);
    // console.log({ data });
    return (
        <div className='cards'>
            {cards.map((elem) => {
                return <Card key={elem._id} {...elem} product={elem} />;
            })}
        </div>

        // <div className='cards'>
        //     {data.map((elem) => {
        //         return <Card key={elem._id} {...elem} product={elem} />;
        //     })}
        // </div>
    );
};
