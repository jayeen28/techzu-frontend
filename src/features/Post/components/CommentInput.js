import React from 'react';
import styles from '../styles/comment.module.scss';
import { IoSend } from 'react-icons/io5';

const CommentInput = ({ loading, handleSubmit, inputRef, ...wrapperProps }) => {
    return (
        <div className={styles.submitComment} {...wrapperProps}>
            <textarea type="text" placeholder='Type your comment' required ref={inputRef} autoFocus />
            {
                loading ? '...' : <IoSend className={styles.submitCommentIcon} onClick={handleSubmit} />
            }
        </div>
    );
}

export default CommentInput;
