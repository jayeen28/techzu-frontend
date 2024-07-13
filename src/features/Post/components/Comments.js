import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadMoreComments } from '../reducers/commentReducer';
import styles from '../styles/comment.module.scss';
import CommentWrapper from './CommentWrapper';

const Comments = ({ replies, noCommentsMessage = true, ...rest } = {}) => {
    const comments = useSelector((store) => store.commentStore.comments).filter((c) => !c.replyOf);//Loaded main comments from store.
    const hasNextPage = useSelector((store) => store.commentStore.pagination.hasNextPage);
    const dispatch = useDispatch();

    function loadClicked() {
        dispatch(loadMoreComments());
    }

    return (
        <div className={styles.comments_wrapper}{...rest}>
            {
                comments.length === 0 && noCommentsMessage ?
                    <h4>No comments</h4>
                    : (replies || comments).map((comment) => <CommentWrapper comment={comment} key={comment._id} displayedCommentsCount={comments.length} />)
            }
            {
                hasNextPage ? <span className={styles.load_more_comments_btn} onClick={loadClicked}>Load more comments</span> : <></>
            }
        </div>
    );
}

export default Comments;
