import React, { useEffect, useState } from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { api } from './utils/api';
import CatalogProducts from './pages/CatalogProducts/CatalogProducts';
import PageProduct from './pages/PageProduct/PageProduct';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { Route, Routes } from 'react-router-dom';
import FavoritePage from './pages/FavoritePage/FavoritePage';
import NotFoundProductPage from './pages/NotFoundProductPage/NotFoundProductPage';
import { CardContext } from './context/cardContext';
import FAQ from './pages/FAQ/FAQ';
import Modal from './components/Modal/Modal';
import RegistrationForm from './components/Forms/RegistrationForm/RegistrationForm';
import AuthorizationForm from './components/Forms/AuthorizationForm/AuthorizationForm';
import PasswordRecoveryForm from './components/Forms/PasswordRecoveryForm/PasswordRecoveryForm';
import { productRating } from './utils/utils';

function App() {
    const [card, setCards] = useState([]);
    const [search, setSearch] = useState(undefined);
    const [user, setUser] = useState({});
    const [favorites, setFavorite] = useState([]);
    const [activeModal, setActiveModal] = useState(true);

    const myCards = (card) => {
        return card.filter(
            (item) =>
                item.author._id === '643fb8243291d790b3f3b309' ||
                item.author._id === '622bd81b06c7d323b8ae4614'
        );
    };

    useEffect(() => {
        if (search === undefined) return;
        api.searchProducts(search)
            .then((data) => setCards(myCards(data)))
            .catch((error) => console.log(error));
    }, [search]);

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getAllProducts()])
            .then(([data, res]) => {
                setUser(data);
                const filtered = myCards(res.products);
                setCards(filtered);

                const MyFavorite = filtered.filter((item) => findFavorite(item, data._id));
                setFavorite(MyFavorite);
            })
            .catch((error) => console.log(error));
    }, []);

    const changeLikeCard = async (product, cardLiked) => {
        const updateLikeInCard = await api
            .editLikeCard(product, cardLiked)
            .catch((error) => console.log(error));

        const newCard = card.map((item) =>
            item._id === updateLikeInCard._id ? updateLikeInCard : item
        );
        setCards([...newCard]);

        cardLiked
            ? setFavorite((state) => state.filter((item) => item._id !== updateLikeInCard._id))
            : setFavorite((state) => [updateLikeInCard, ...state]);
    };

    const findFavorite = (card, id) => {
        return card.likes.some((i) => i === id);
    };

    const onSort = (sortId) => {
        switch (sortId) {
            case 'lowPrice':
                return setCards((state) => [...state.sort((a, b) => a.price - b.price)]);
            case 'highPrice':
                return setCards((state) => [...state.sort((a, b) => b.price - a.price)]);
            case 'sale':
                return setCards((state) => [...state.sort((a, b) => b.discount - a.discount)]);
            case 'newProduct':
                return setCards((state) => [
                    ...state.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),
                ]);
            case 'popular':
                return setCards((state) => [
                    ...state.sort((a, b) => b.likes.length - a.likes.length),
                ]);
            case 'rate':
                return setCards((state) => [
                    ...state.sort((a, b) => productRating(b.reviews) - productRating(a.reviews)),
                ]);
            default:
                return setCards((state) => [...state.sort((a, b) => a.price - b.price)]);
        }
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
        activeModal,
        setActiveModal,
    };

    return (
        <div className='App'>
            <CardContext.Provider value={cardsValue}>
                <Header setSearch={setSearch}></Header>
                <main className='main'>
                    <div className='container'>
                        <Routes>
                            <Route path='/' element={<CatalogProducts />} />
                            <Route path='/product/:id' element={<PageProduct />} />
                            <Route path='/favorite' element={<FavoritePage />} />
                            <Route path='*' element={<NotFoundPage />} />
                            <Route
                                path='/notfoundProduct'
                                element={<NotFoundProductPage setSearch={setSearch} />}
                            />
                            <Route path='/faq' element={<FAQ />}></Route>
                            <Route
                                path='/register'
                                element={<Modal children={<RegistrationForm />} />}
                            ></Route>
                            <Route
                                path='/auth'
                                element={<Modal children={<AuthorizationForm />} />}
                            ></Route>
                            <Route
                                path='/newPass'
                                element={<Modal children={<PasswordRecoveryForm />} />}
                            ></Route>
                        </Routes>
                    </div>
                </main>
                <Footer />
            </CardContext.Provider>
        </div>
    );
}

export default App;
