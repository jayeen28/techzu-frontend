import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import MainLoading from '../../components/MainLoading';
import { setLoading, setUser } from './reducers/userReducer';
import req from '../../lib/req';

const PrivateRoute = ({ children }) => {
    const userId = useSelector((state) => state.userStore.user._id);
    const loading = useSelector((state) => state.userStore.loading);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!userId) {
            req({ uri: '/user/me' })
                .then(({ data }) => dispatch(setUser(data)))
                .catch(e => console.log(e.message))
                .finally(() => dispatch(setLoading(false)));
        }
    }, [dispatch, userId]);

    return (
        <>
            {
                loading ?
                    <MainLoading /> :
                    <>
                        {
                            userId ?
                                children :
                                <Navigate to='/login' />
                        }
                    </>
            }
        </>
    );
}

export default PrivateRoute;
