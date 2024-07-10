import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from './components/Toaster';
import Router from './pages/Router';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Router />
                <Toaster />
            </BrowserRouter>
        </div>
    );
}

export default App;
