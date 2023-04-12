import React from 'react';
import testData from './assents/data.json'; //Массив с данными карточек
import Card from './components/Card/Card'; //Компонент обертка для карточек
import Header from './components/Header/index'; //Можно и таким образом подключить './components/Header'
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
        <>
            <Header />
            <h1>First page</h1>
            <div className="container">
                {testData.map((el, index) => {
                    return (
                        <Card
                            key={index}
                            img={el.pictures}
                            name={el.name}
                            price={el.price}
                        />
                    );
                })}
                {promoData.map((el) => {
                    return <Promo key={el} text={el} />;
                })}
            </div>
        </>
    );
};

export default App;
