import React, { useEffect, useState } from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { api, editLikeCard, getOneProduct } from './utils/api';
import CatalogProducts from './pages/CatalogProducts/CatalogProducts';
import PageProduct from './pages/PageProduct/PageProduct';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { Route, Routes } from 'react-router-dom';
import FavoritePage from './pages/FavoritePage/FavoritePage';
import RouterAuth from './route/RouterAuth/RouterAuth';
import NotFoundProductPage from './pages/NotFoundProductPage/NotFoundProductPage';
import { CardContext } from './context/cardContext';
import FAQ from './pages/FAQ/FAQ';

function App() {
    const localStorage = window.localStorage;
    const localStorageCards = JSON.parse(localStorage.getItem('card'));
    const [card, setCards] = useState([]);
    const [search, setSearch] = useState(undefined);
    const [user, setUser] = useState({});
    const [isAuth, setAuth] = useState(true);
    const [favorites, setFavorite] = useState([]);

    const myCards = (card) => {
        return card.filter(
            (item) => item.author._id === '643fb8243291d790b3f3b309'
        );
    };

    const changeLikeCard = async (product, cardLiked) => {
        const updateLikeInCard = await editLikeCard(product, cardLiked).catch(
            (error) => console.log(error)
        );

        const newCard = card.map((item) =>
            item._id === updateLikeInCard._id ? updateLikeInCard : item
        );

        setCards([...newCard]);
        localStorage.setItem('card', JSON.stringify(newCard));

        const newFavorite = newCard.filter((item) =>
            findFavorite(item, user._id)
        );
        setFavorite(newFavorite);
    };

    useEffect(() => {
        if (search === undefined) return;
        api.searchProducts(search)
            .then((data) => setCards(myCards(data)))
            .catch((error) => console.log(error));
    }, [search]);

    const findFavorite = (card, id) => {
        return card.likes.some((i) => i == id);
    };

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getAllProducts()]).then(
            ([data, res]) => {
                setUser(data);
                const filtered = myCards(res.products);
                setCards(filtered);
                localStorage.setItem('card', JSON.stringify(filtered));

                const MyFavorite = localStorageCards.filter((item) =>
                    findFavorite(item, data._id)
                );
                setFavorite(MyFavorite);
            }
        );
    }, []);

    const onSort = (sortId) => {
        if (sortId === 'all') {
            const newCard = localStorageCards;
            setCards([...newCard]);
        }
        if (sortId === 'lowPrice') {
            const newCards = localStorageCards.sort(
                (a, b) => a.price - b.price
            );
            setCards([...newCards]);
        }
        if (sortId === 'highPrice') {
            const newCards = localStorageCards.sort(
                (a, b) => b.price - a.price
            );
            setCards([...newCards]);
        }
        if (sortId === 'sale') {
            const newCards = localStorageCards.sort(
                (a, b) => a.discount - b.discount
            );
            setCards([...newCards]);
        }
        if (sortId === 'new') {
            const newCards = card.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );
            setCards([...newCards]);
        }
        if (sortId === 'popular') {
            const newCards = localStorageCards.sort(
                (a, b) => b.likes.length - a.likes.length
            );
            setCards([...newCards]);
        }
    };

    const productRating = (product) => {
        if (!product.reviews || !product.reviews.length) {
            return 0;
        }
        const res = product.reviews.reduce((acc, el) => (acc += el.rating), 0);
        return Math.round(res / product.reviews.length);
    };

    const cardsValue = {
        card,
        search,
        user,
        favorites,
        setCards,
        changeLikeCard,
        onSort,
        findFavorite,
        setFavorite,
        productRating,
        localStorage,
        localStorageCards,
    };

    return (
        <div className="App">
            <CardContext.Provider value={cardsValue}>
                <Header setSearch={setSearch}></Header>
                <main className="main">
                    <div className="container">
                        {isAuth ? (
                            <Routes>
                                <Route path="/" element={<CatalogProducts />} />
                                <Route
                                    path="/product/:id"
                                    element={<PageProduct />}
                                />
                                <Route
                                    path="/favorite"
                                    element={<FavoritePage />}
                                />
                                <Route path="*" element={<NotFoundPage />} />
                                <Route
                                    path="/notfoundProduct"
                                    element={
                                        <NotFoundProductPage
                                            setSearch={setSearch}
                                        />
                                    }
                                />
                                <Route path="/faq" element={<FAQ />}></Route>
                            </Routes>
                        ) : (
                            <RouterAuth />
                        )}
                    </div>
                </main>
                <Footer />
            </CardContext.Provider>
        </div>
    );
}

export default App;
