import React, { useState } from 'react';
import Avatar from '../../../components/Avatar/Avatar';
import styles from '../styles/comment.module.scss';
import CommentBox from './CommentBox';
import EditComment from './EditComment';

const Comment = ({ comment }) => {
    const [editMode, setEditMode] = useState(false);

    return (
        <div className={styles.comment_box_wrapper}>
            <div>
                <Avatar id={comment.user.avatar_file_id} style={{ height: '40px', width: '40px' }} />
            </div>
            <div className={styles.comment_content_wrapper}>
                {
                    editMode ?
                        <EditComment editMode={editMode} setEditMode={setEditMode} comment={comment} />
                        :
                        <CommentBox comment={comment} setEditMode={setEditMode} />
                }
            </div>
        </div>
    );
}

export default Comment;
