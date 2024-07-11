import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from './components/Toaster';
import Router from './pages/Router';
import { Provider as StoreProvider } from 'react-redux';
import { store } from './store';
import ModalProvider from './context/ModalProvider';
import Modal from './components/Modal/Modal';

const App = () => {
    return (
        <ModalProvider>
            <StoreProvider store={store}>
                <BrowserRouter>
                    <Router />
                    <Toaster />
                    <Modal />
                </BrowserRouter>
            </StoreProvider>
        </ModalProvider>
    );
}

export default App;
