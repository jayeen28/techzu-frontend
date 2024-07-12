import React from 'react';
import { Toaster } from './components/Toaster';
import Router from './pages/Router';
import Modal from './components/Modal/Modal';
import Context from './context/Context';
import AppLifeCycle from './components/AppLifeCycle';

const App = () => {
    return (
        <Context>
            <AppLifeCycle />
            <Router />
            <Toaster />
            <Modal />
        </Context>
    );
}

export default App;
