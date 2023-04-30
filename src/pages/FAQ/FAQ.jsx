import React, { useState } from 'react';
import './faq.css';

const FAQ = () => {
    const [activeState, setActiveState] = useState(false);

    return (
        <div className="faq__wrapper">
            <h2 className="faq__title">Часто спрашивают</h2>
            <div className="faq__content">
                <div className="faq__subtitle">
                    <span className="faq__span">{activeState ? '-' : '+'}</span>
                    <p onClick={() => setActiveState(!activeState)}>
                        Случайный текст похож на гитарный перебор?
                    </p>
                </div>
                {activeState ? (
                    <span className="faq__info">
                        Прежде всего, дальнейшее развитие различных форм
                        деятельности предоставляет широкие возможности для
                        дальнейших направлений развития. В своём стремлении
                        повысить качество жизни, они забывают, что семантический
                        разбор внешних противодействий представляет собой
                        интересный эксперимент проверки инновационных методов
                        управления процессами.
                    </span>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default FAQ;
