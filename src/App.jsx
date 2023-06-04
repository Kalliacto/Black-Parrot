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
import { myCards, productRating } from './utils/utils';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './store/slices/userSlice';
import { getAllProductsData } from './store/slices/productsSlice';

function App() {
    const [card, setCards] = useState([]);
    const [search, setSearch] = useState(undefined);
    const [activeModal, setActiveModal] = useState(false);
    const [haveTokenAuth, setHaveTokenAuth] = useState(!!localStorage.getItem('token'));
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    // const { userData } = useSelector((s) => s.user);
    const { dataProducts } = useSelector((s) => s.products);

    useEffect(() => {
        // Проверка на токен должна быть тут, если нет ничего не делай
        dispatch(getUser()).then(() => dispatch(getAllProductsData()));
    }, [dispatch]);

    useEffect(() => {
        if (search === undefined) return;
        api.searchProducts(search)
            .then((data) => setCards(myCards(data)))
            .catch((error) => console.log(error));
    }, [search]);

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

    const [currentPage, setCurrentPage] = useState(1);
    const [cardsOnPage, setCardsOnPage] = useState(4);
    const lastPageIndex = currentPage * cardsOnPage;
    const firstPageIndex = lastPageIndex - cardsOnPage;
    const currentCards = dataProducts.slice(firstPageIndex, lastPageIndex);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const cardsValue = {
        search,
        onSort,
        activeModal,
        setActiveModal,
        setHaveTokenAuth,
        haveTokenAuth,
        showPassword,
        setShowPassword,
        currentCards,
        cardsOnPage,
        setCurrentPage,
        currentPage,
        setCardsOnPage,
    };

    return (
        <div className='App'>
            <CardContext.Provider value={cardsValue}>
                <Header setSearch={setSearch}></Header>
                <main className='main'>
                    <div className='container'>
                        <Routes>
                            <Route
                                path='/'
                                element={
                                    <CatalogProducts
                                        allCards={dataProducts.length}
                                        paginate={paginate}
                                    />
                                }
                            />
                            <Route path='/product/:id' element={<PageProduct />} />
                            <Route path='/favorite' element={<FavoritePage />} />
                            <Route path='/profile' element={<ProfilePage />}></Route>
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
