import React from 'react';
import { useSelector } from 'react-redux';
import Comment from './Comment';
import styles from '../styles/comment.module.scss';

const Comments = () => {
    const commentIds = useSelector((store) => store.commentStore.comments.map(({ _id }) => _id));

    return (
        <div className={styles.comments_wrapper}>
            {
                commentIds.length > 0 ?
                    <h4>No comments</h4>
                    : commentIds.map((commentId) => <Comment commentId={commentId} />)
            }
        </div>
    );
}

export default Comments;
