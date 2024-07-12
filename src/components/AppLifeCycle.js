import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading, setUser } from '../features/PrivateRoute/reducers/userReducer';
import req from '../lib/req';

const AppLifeCycle = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoading(true))
        req({ uri: '/user/me' })
            .then(({ data }) => dispatch(setUser(data)))
            .catch(e => console.log(e.message))
            .finally(() => dispatch(setLoading(false)));
    }, [dispatch]);

    return (<></>);
}

export default AppLifeCycle;
