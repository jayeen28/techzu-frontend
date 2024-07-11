import React from 'react';
import styles from '../styles/comment.module.scss';
import Avatar from '../../../components/Avatar/Avatar';
import getTimeAgo from '../../../utils/getTimeAgo';

const Comment = ({ comment }) => {
    return (
        <div className={styles.comment_box_wrapper}>
            <div>
                <Avatar id={comment.user.avatar_file_id} style={{ height: '40px', width: '40px' }} />
            </div>
            <div className={styles.comment_content_wrapper}>
                <div className={styles.comment_content}>
                    <h5>{comment.user.full_name}</h5>
                    <p>{comment.content}</p>
                </div>
                <div className={styles.comment_content_bottom}>
                    <span>{getTimeAgo(comment.createdAt)}</span>
                    <span>Like</span>
                    <span>Dislike</span>
                    <span>Reply</span>
                </div>
            </div>
        </div>
    );
}

export default Comment;
