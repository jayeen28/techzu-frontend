import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/comment.module.scss';
import CommentWrapper from './CommentWrapper';

const Comments = () => {
    const comments = useSelector((store) => store.commentStore.comments);

    return (
        <div className={styles.comments_wrapper}>
            {
                comments.length === 0 ?
                    <h4>No comments</h4>
                    : comments.map((comment) => <CommentWrapper comment={comment} key={comment._id} />)
            }
        </div>
    );
}

export default Comments;
