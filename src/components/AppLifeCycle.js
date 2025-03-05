import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading, setUser } from '../features/PrivateRoute/reducers/userReducer';
import req from '../lib/req';
import { useSocket } from '../context/SocketProvider';

const AppLifeCycle = () => {
    const dispatch = useDispatch();
    const socket = useSocket();

    useEffect(() => {
        dispatch(setLoading(true))
        req({ uri: '/user/me' })
            .then(({ data }) => {
                socket.connect();
                dispatch(setUser(data));
            })
            .catch(e => console.log(e.message))
            .finally(() => dispatch(setLoading(false)));

        return () => socket.disconnect();
    }, [dispatch, socket]);

    return (<></>);
}

export default AppLifeCycle;
