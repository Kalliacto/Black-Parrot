import React from 'react';

const promoData = ['=)', '^_^', 'O_o', 'X_x', ';=('];

const Promo = (props) => {
    return (
        <div className="promo__block">
            <div className="promo__img" />
            <p className="promo__text">{props.text}</p>
        </div>
    );
};

const App = () => {
    return (
        <div>
            <h1>First page</h1>
            <div className="container">
                {promoData.map((el) => {
                    return <Promo text={el} />;
                })}
            </div>
        </div>
    );
};

export default App;
