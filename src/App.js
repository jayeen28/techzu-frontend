import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from './components/Toaster';
import Router from './pages/Router';
import { Provider as StoreProvider } from 'react-redux';
import { store } from './store';

const App = () => {
    return (
        <div>
            <StoreProvider store={store}>
                <BrowserRouter>
                    <Router />
                    <Toaster />
                </BrowserRouter>
            </StoreProvider>
        </div>
    );
}

export default App;
