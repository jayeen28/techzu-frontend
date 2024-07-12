import React from 'react';
import { RxCross2 } from "react-icons/rx";
import styles from '../styles/commentModal.module.scss';
import { useModal } from '../../../context/ModalProvider';
import Comments from './Comments';
import SubmitComment from './SubmitComment';
import SortComment from './SortComment';

const CommentModal = () => {
    const { closeModal } = useModal();
    return (
        <div className={styles.commentModalShell}>
            <div className={styles.commentModalNav}>
                <h2>Comments</h2>
                <RxCross2 className={styles.commentsModalCloseIcon} onClick={() => closeModal('comments')} />
            </div>
            <div className={styles.commentModallBottom}>
                <SortComment />
                <Comments />
                <SubmitComment />
            </div>
        </div>
    );
}

export default CommentModal;
