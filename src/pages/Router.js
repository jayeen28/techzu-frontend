import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import PrivateRoute from '../features/PrivateRoute/PrivateRoute';
import Posts from './Posts';

const Router = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/posts' element={<PrivateRoute><Posts /></PrivateRoute>} />
        </Routes>
    );
}

export default Router;
