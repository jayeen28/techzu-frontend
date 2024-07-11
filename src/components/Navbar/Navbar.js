import React from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../Avatar/Avatar';
import styles from './navbar.module.scss';

const Navbar = ({ children }) => {
    const avatar_file_id = useSelector((state) => state.userStore.user.avatar_file_id);
    return (
        <>
            <div className={styles.navbar_wrapper}>
                <div className={styles.navbar_right}>
                    <div>
                        <button>Logout</button>
                    </div>
                    <Avatar id={avatar_file_id} />
                </div>
            </div>
            <div className={styles.navbar_body}>
                {children}
            </div>
        </>
    );
}

export default Navbar;
