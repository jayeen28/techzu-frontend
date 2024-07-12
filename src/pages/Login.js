import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setUser } from '../features/PrivateRoute/reducers/userReducer';
import req from '../lib/req';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../context/SocketProvider';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const { handleSubmit, register } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const socket = useSocket();

    const onSubmit = (data) => {
        setLoading(true);
        req({ method: 'POST', uri: '/user/login', data })
            .then(({ data }) => {
                socket.connect();
                dispatch(setUser(data));
                navigate('/');
            })
            .catch(() => toast('Credentials are invalid.', 'error'))
            .finally(() => setLoading(false))
    };

    return (
        <div className='form_wrapper'>
            <form onSubmit={handleSubmit(onSubmit)} className='form'>
                <input type='email' placeholder='Your email' required {...register('email')} />
                <input type='password' placeholder='Your password' required {...register('password')} minLength={5} maxLength={50} />
                <button type='submit' disabled={loading}>Login</button>
            </form>
        </div>
    );
}

export default Login;
