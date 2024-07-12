import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import { store } from '../store';
import ModalProvider from '../context/ModalProvider';
import SocketProvider from '../context/SocketProvider';

const Context = ({ children }) => {
    return (
        <SocketProvider>
            <ModalProvider>
                <StoreProvider store={store}>
                    <BrowserRouter>
                        {children}
                    </BrowserRouter>
                </StoreProvider>
            </ModalProvider>
        </SocketProvider>
    );
}

export default Context;
