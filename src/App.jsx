import React from 'react';
import testData from './assents/data.json'; //Массив с данными карточек
import Card from './components/Card/Card'; //Компонент обертка для карточек

const promoData = ['=)', '^_^', 'O_o', 'X_x', ';=('];

console.log(Card);

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
                {testData.map((el) => {
                    return (
                        <Card
                            img={el.pictures}
                            name={el.name}
                            price={el.price}
                        />
                    );
                })}
                {promoData.map((el) => {
                    return <Promo text={el} />;
                })}
            </div>
        </div>
    );
};

export default App;
