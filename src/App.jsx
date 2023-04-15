import React from 'react';
import testData from './assents/data.json'; //Массив с данными карточек
import Card from './components/Card/Card'; //Компонент обертка для карточек
// import Header from './components/General/index'; //Можно и таким образом подключить './components/Header'
import Header from './components/General/Header';
import Footer from './components/General/Footer';
import Promo from './components/Promo/Promo';
const promoData = ['=)', '^_^', 'O_o', 'X_x', ';=('];

const App = () => {
    return (
        <>
            <Header />
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
            <Footer />
        </>
    );
};

export default App;
