import React from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../Avatar/Avatar';
import styles from './navbar.module.scss';
import req from '../../lib/req';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ children }) => {
    const avatar_file_id = useSelector((state) => state.userStore.user.avatar_file_id);
    const navigate = useNavigate();

    function handleLogout() {
        req({ method: 'POST', uri: '/user/logout' })
            .then(() => navigate('/login'));
    }

    return (
        <>
            <div className={styles.navbar_holder}>
                <div className={styles.navbar_wrapper}>
                    <div className={styles.navbar_right}>
                        <div>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                        <Avatar id={avatar_file_id} />
                    </div>
                </div>
            </div>
            <div className={styles.navbar_body}>
                {children}
            </div>
        </>
    );
}

export default Navbar;
