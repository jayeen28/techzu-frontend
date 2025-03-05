import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import { store } from '../store';
import ModalProvider from '../context/ModalProvider';
import SocketProvider from '../context/SocketProvider';
import { IconContext } from 'react-icons';

const Context = ({ children }) => {
    return (
        <IconContext.Provider value={{ className: "react-icons" }}>
            <SocketProvider>
                <ModalProvider>
                    <StoreProvider store={store}>
                        <BrowserRouter>
                            {children}
                        </BrowserRouter>
                    </StoreProvider>
                </ModalProvider>
            </SocketProvider>
        </IconContext.Provider>
    );
}

export default Context;
