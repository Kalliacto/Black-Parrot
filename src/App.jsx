import React, { useEffect, useState } from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import CatalogProducts from './pages/CatalogProducts/CatalogProducts';
import PageProduct from './pages/PageProduct/PageProduct';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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
import { getUser, setIsAuth } from './store/slices/userSlice';
import { getAllProductsData, searchProducts } from './store/slices/productsSlice';
import { parseJwt } from './utils/utils';
import BasketPage from './pages/BasketPage/BasketPage';
import { updateBasketProducts } from './store/slices/basketSlice';
import { updateProductsInLocal } from './store/slices/oneProductSlice';

function App() {
    const [activeModal, setActiveModal] = useState(false);
    const { products, search } = useSelector((s) => s.products);
    const { isAuth } = useSelector((s) => s.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = parseJwt(localStorage.getItem('tokenParrot'));
        if (token && new Date() < new Date(token?.exp * 1e3)) {
            dispatch(setIsAuth(true));
        } else {
            if (
                location.pathname.includes('/auth') ||
                location.pathname.includes('/register') ||
                location.pathname.includes('/newPass')
            ) {
                return;
            } else {
                navigate('/auth');
                setActiveModal(true);
            }
        }
    }, [navigate, isAuth]);

    useEffect(() => {
        if (!isAuth) {
            return;
        }
        dispatch(getUser()).then(() => dispatch(getAllProductsData()));

        if (localStorage.getItem('basketParrot')) {
            dispatch(updateBasketProducts(localStorage.getItem('basketParrot')));
        }
        if (localStorage.getItem('productsInLocal')) {
            dispatch(updateProductsInLocal(localStorage.getItem('productsInLocal')));
        }
    }, [dispatch, isAuth]);

    useEffect(() => {
        if (search === undefined) return;
        const timer = setTimeout(() => {
            dispatch(searchProducts(search));
        }, 200);
        return () => clearTimeout(timer);
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
                            <Route path='/basket' element={<BasketPage />}></Route>
                        </Routes>
                    </div>
                </main>
                <Footer />
            </CardContext.Provider>
        </div>
    );
}

export default App;
