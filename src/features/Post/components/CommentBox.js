import React from 'react';
import styles from '../styles/comment.module.scss';
import LikesDislikesCount from './LikesDislikesCount';
import getTimeAgo from '../../../utils/getTimeAgo';
import { BsThreeDots } from 'react-icons/bs';
import Popper from '../../../components/Popper/Popper';
import { useSelector } from 'react-redux';
import useComment from '../hooks/useComment';

const CommentBox = ({ comment, setEditMode, replyClicked = () => { } }) => {
    const userId = useSelector((state) => state.userStore.user._id);
    const { handleRemoveComment, handleReaction } = useComment({ comment, userId });
    const { element: myReaction } = comment.reactions.find(r => r.user === userId) || {};

    return (
        <>
            <div className={styles.comment_content_box_wrapper}>
                <div className={styles.comment_content_box}>
                    <h5>{comment.user.full_name}</h5>
                    <p>{comment.content}</p>
                </div>
                {
                    comment.user._id === userId ?
                        <div className={styles.edit_or_delete_comment_icon_wrapper}>
                            <Popper holder={<BsThreeDots className={styles.edit_or_delete_comment_icon} title='Edit or delete comment' />}>
                                <div className={styles.edit_or_delete_popper}>
                                    <div onClick={handleRemoveComment}>Delete</div>
                                    <div onClick={() => setEditMode(true)}>Edit</div>
                                </div>
                            </Popper>
                        </div> :
                        <></>
                }
            </div>
            <div className={styles.comment_content_bottom}>
                <span>{getTimeAgo(comment.createdAt)}</span>
                <span
                    onClick={() => handleReaction('like', myReaction)}
                    className={`${myReaction ? styles.disabled : styles.active} ${myReaction === 'like' ? styles.focused : ''}`}
                >
                    Like
                </span>
                <span
                    onClick={() => handleReaction('dislike', myReaction)}
                    className={`${myReaction ? styles.disabled : styles.active} ${myReaction === 'dislike' ? styles.focused : ''}`}
                >
                    Dislike
                </span>
                {comment.replyOf ? <></> : <span className={styles.active} onClick={replyClicked}>Reply</span>}
                {comment.edited ? <span>Edited</span> : <></>}
                <LikesDislikesCount likes={comment.likes} dislikes={comment.dislikes} />
            </div>
        </>
    );
}

export default CommentBox;
