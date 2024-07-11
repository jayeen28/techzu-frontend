import React from 'react';
import styles from '../styles/comment.module.scss';
import { IoSend } from "react-icons/io5";

const SubmitComment = () => {
    return (
        <div className={styles.submitComment}>
            <textarea type="text" placeholder='Type your comment' required />
            <IoSend className={styles.submitCommentIcon} />
        </div>
    );
}

export default SubmitComment;
