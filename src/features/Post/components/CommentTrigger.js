import React from 'react';
import { FaComment } from "react-icons/fa";
import styles from '../styles/comment.module.scss';
import { useSelector } from 'react-redux';
import { useModal } from '../../../context/ModalProvider';
import CommentModal from './CommentModal';

const CommentTrigger = () => {
    const commentsCount = useSelector((state) => state.commentStore.pagination.totalDocs);
    const loading = useSelector((state) => state.commentStore.loading);
    const { openModal } = useModal();

    const handleCommentIconClick = () => {
        openModal('comments', <CommentModal />);
    }

    return (
        <div className={styles.comments_wrapper}>
            <div className={styles.comments_icon_wrapper} onClick={handleCommentIconClick}>
                <small>{loading ? '...' : commentsCount}</small><FaComment />
            </div>
        </div>
    );
}

export default CommentTrigger;
