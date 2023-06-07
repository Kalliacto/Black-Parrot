import React, { useEffect, useState } from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import CatalogProducts from './pages/CatalogProducts/CatalogProducts';
import PageProduct from './pages/PageProduct/PageProduct';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { Route, Routes, useNavigate } from 'react-router-dom';
import FavoritePage from './pages/FavoritePage/FavoritePage';
import NotFoundProductPage from './pages/NotFoundProductPage/NotFoundProductPage';
import { CardContext } from './context/cardContext';
import FAQ from './pages/FAQ/FAQ';
import Modal from './components/Modal/Modal';
import RegistrationForm from './components/Forms/RegistrationForm/RegistrationForm';
import AuthorizationForm from './components/Forms/AuthorizationForm/AuthorizationForm';
import PasswordRecoveryForm from './components/Forms/PasswordRecoveryForm/PasswordRecoveryForm';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './store/slices/userSlice';
import { getAllProductsData, searchProducts } from './store/slices/productsSlice';
import { parseJwt } from './utils/utils';

function App() {
    const [activeModal, setActiveModal] = useState(false);
    const [haveTokenAuth, setHaveTokenAuth] = useState(!!localStorage.getItem('token'));
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { products, search } = useSelector((s) => s.products);

    // Проверка на токен годный
    useEffect(() => {
        const token = parseJwt(localStorage.getItem('token'));
        if (token && new Date() < new Date(token?.exp * 1e3)) {
            setHaveTokenAuth(true);
        } else {
            setActiveModal(true);
        }
    }, [navigate]);

    useEffect(() => {
        if (!haveTokenAuth) {
            return;
        }
        dispatch(getUser()).then(() => dispatch(getAllProductsData()));
    }, [dispatch, haveTokenAuth]);

    useEffect(() => {
        if (search === undefined) return;
        dispatch(searchProducts(search));
    }, [dispatch, search]);

    const [currentPage, setCurrentPage] = useState(1);
    const [cardsOnPage, setCardsOnPage] = useState(4);
    const lastPageIndex = currentPage * cardsOnPage;
    const firstPageIndex = lastPageIndex - cardsOnPage;
    const currentCards = products.slice(firstPageIndex, lastPageIndex);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const cardsValue = {
        activeModal,
        setActiveModal,
        setHaveTokenAuth,
        haveTokenAuth,
        currentCards,
        cardsOnPage,
        setCurrentPage,
        currentPage,
        setCardsOnPage,
    };

    return (
        <div className='App'>
            <CardContext.Provider value={cardsValue}>
                <Header />
                <main className='main'>
                    <div className='container'>
                        <Routes>
                            <Route
                                path='/'
                                element={
                                    <CatalogProducts
                                        allCards={products.length}
                                        paginate={paginate}
                                    />
                                }
                            />
                            <Route path='/product/:id' element={<PageProduct />} />
                            <Route path='/favorite' element={<FavoritePage />} />
                            <Route path='/profile' element={<ProfilePage />}></Route>
                            <Route path='*' element={<NotFoundPage />} />
                            <Route path='/notfoundProduct' element={<NotFoundProductPage />} />
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
