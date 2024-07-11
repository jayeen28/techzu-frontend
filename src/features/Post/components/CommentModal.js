import React from 'react';
import { RxCross2 } from "react-icons/rx";
import styles from '../styles/commentModal.module.scss';
import { useModal } from '../../../context/ModalProvider';
import Comments from './Comments';

const CommentModal = () => {
    const { closeModal } = useModal();
    return (
        <div className={styles.commentModalShell}>
            <div className={styles.commentModalNav}>
                <h2>Comments</h2>
                <RxCross2 className={styles.commentsModalCloseIcon} onClick={() => closeModal('comments')} />
            </div>
            <Comments />
        </div>
    );
}

export default CommentModal;
