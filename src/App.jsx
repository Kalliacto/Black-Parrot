import React from 'react';
import { useState } from 'react';
import testData from './assents/data.json'; //Массив с данными карточек
import Card from './components/Card/Card'; //Компонент обертка для карточек
// import Header from './components/General/index'; //Можно и таким образом подключить './components/Header'
import { Header, Footer } from './components/General';
import Promo from './components/Promo/Promo';
const promoData = ['=)', '^_^', 'O_o', 'X_x', ';=('];

const App = () => {
    // const user = localStorage.getItem('user12');
    const [user, setUser] = useState(localStorage.getItem('user12'));

    return (
        <>
            <Header user={user} upd={setUser} />
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
