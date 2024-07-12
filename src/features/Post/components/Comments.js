import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/comment.module.scss';
import CommentWrapper from './CommentWrapper';
import useComment from '../hooks/useComment';
import { loadMoreComments } from '../reducers/commentReducer';

const Comments = () => {
    const comments = useSelector((store) => store.commentStore.comments);
    const hasNextPage = useSelector((store) => store.commentStore.pagination.hasNextPage);
    const dispatch = useDispatch();

    function loadClicked() {
        dispatch(loadMoreComments());
    }

    return (
        <div className={styles.comments_wrapper}>
            {
                comments.length === 0 ?
                    <h4>No comments</h4>
                    : comments.map((comment) => <CommentWrapper comment={comment} key={comment._id} />)
            }
            {
                hasNextPage ? <span className={styles.load_more_comments_btn} onClick={loadClicked}>Load more comments</span> : <></>
            }
        </div>
    );
}

export default Comments;
