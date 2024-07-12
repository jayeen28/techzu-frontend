import React from 'react';
import { BsThreeDots } from "react-icons/bs";
import { useSelector } from 'react-redux';
import Avatar from '../../../components/Avatar/Avatar';
import Popper from '../../../components/Popper/Popper';
import getTimeAgo from '../../../utils/getTimeAgo';
import useComment from '../hooks/useComment';
import styles from '../styles/comment.module.scss';
import LikesDislikesCount from './LikesDislikesCount';


const Comment = ({ comment }) => {
    const userId = useSelector((state) => state.userStore.user._id);
    const { handleRemoveComment, handleReaction } = useComment({ comment, userId });
    const { element: myReaction } = comment.reactions.find(r => r.user === userId) || {};
    const { likes, dislikes } = comment;

    return (
        <div className={styles.comment_box_wrapper}>
            <div>
                <Avatar id={comment.user.avatar_file_id} style={{ height: '40px', width: '40px' }} />
            </div>
            <div className={styles.comment_content_wrapper}>
                <div className={styles.comment_content_box_wrapper}>
                    <div className={styles.comment_content_box}>
                        <h5>{comment.user.full_name}</h5>
                        <p>{comment.content}</p>
                    </div>
                    <div className={styles.edit_or_delete_comment_icon_wrapper}>
                        <Popper holder={<BsThreeDots className={styles.edit_or_delete_comment_icon} title='Edit or delete comment' />}>
                            <div className={styles.edit_or_delete_popper}>
                                <div onClick={handleRemoveComment}>Delete</div>
                                <div>Edit</div>
                            </div>
                        </Popper>
                    </div>
                </div>
                <div className={styles.comment_content_bottom}>
                    <span>{getTimeAgo(comment.createdAt)}</span>
                    <span
                        onClick={() => handleReaction('like', myReaction)}
                        style={myReaction ? {
                            cursor: 'not-allowed',
                            textDecoration: 'none',
                            fontWeight: myReaction === 'like' ? 700 : 'normal'
                        } : {}}
                    >
                        Like
                    </span>
                    <span
                        onClick={() => handleReaction('dislike')}
                        style={myReaction ? {
                            cursor: 'not-allowed',
                            textDecoration: 'none',
                            fontWeight: myReaction === 'dislike' ? 700 : 'normal'
                        } : {}}
                    >
                        Dislike
                    </span>
                    <span>Reply</span>
                    {comment.edited ? <span>Edited</span> : <></>}
                    <LikesDislikesCount likes={likes} dislikes={dislikes} />
                </div>
            </div>
        </div>
    );
}

export default Comment;
