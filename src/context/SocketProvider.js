import React, { createContext, useContext } from 'react';
import { io } from 'socket.io-client';

const socketContext = createContext();

const SocketProvider = ({ children }) => {

    const socket = io(process.env.REACT_APP_SOCKET_URL, {
        reconnectionDelayMax: 10000,
        withCredentials: true,
        autoConnect: false
    });

    return (
        <socketContext.Provider value={socket}>
            {children}
        </socketContext.Provider>
    );
}

export default SocketProvider;

export const useSocket = () => useContext(socketContext);
