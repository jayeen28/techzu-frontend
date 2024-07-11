import React from 'react';
import styles from './avatar.module.scss';

const Avatar = ({ id, ...rest }) => {
    return (
        <div className={styles.avatar_wrapper} {...rest}>
            <img className={styles.avatar} src={`${process.env.REACT_APP_BACKEND_URL}/file/${id}`} alt='Avatar' />
        </div>
    );
}

export default Avatar;
