import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import MainLoading from '../../components/MainLoading/MainLoading';

const PrivateRoute = ({ children }) => {
    const userId = useSelector((state) => state.userStore.user._id);
    const loading = useSelector((state) => state.userStore.loading);

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
