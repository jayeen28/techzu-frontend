import React from 'react';
import { BsThreeDots } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../../../components/Avatar/Avatar';
import { toast } from '../../../components/Toaster';
import req from '../../../lib/req';
import getTimeAgo from '../../../utils/getTimeAgo';
import { addReaction, removeReaction } from '../reducers/commentReducer';
import styles from '../styles/comment.module.scss';
import { IoIosThumbsUp } from "react-icons/io";
import { IoIosThumbsDown } from "react-icons/io";


const Comment = ({ comment }) => {
    const userId = useSelector((state) => state.userStore.user._id);
    const { element: reaction } = comment.reactions.find(r => r.user === userId) || {};
    const { likes, dislikes } = comment;

    const dispatch = useDispatch();

    function handleReaction(react) {
        if (reaction) return;
        dispatch(addReaction({ _id: comment._id, data: { user: userId, element: react } }));
        req({ method: 'PATCH', uri: `/comment/react/${comment._id}/${react}` })
            .then(() => { })
            .catch(e => {
                dispatch(removeReaction({ _id: comment._id, data: { userId, element: react } }));
                console.log(e.message);
                toast('Something went wrong!', 'error');
            })
    }

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
                        <BsThreeDots className={styles.edit_or_delete_comment_icon} title='Edit or delete comment' />
                    </div>
                </div>
                <div className={styles.comment_content_bottom}>
                    <span>{getTimeAgo(comment.createdAt)}</span>
                    <span
                        onClick={() => handleReaction('like')}
                        style={reaction ? {
                            cursor: 'not-allowed',
                            textDecoration: 'none',
                            fontWeight: reaction === 'like' ? 700 : 'normal'
                        } : {}}
                    >
                        Like
                    </span>
                    <span
                        onClick={() => handleReaction('dislike')}
                        style={reaction ? {
                            cursor: 'not-allowed',
                            textDecoration: 'none',
                            fontWeight: reaction === 'dislike' ? 700 : 'normal'
                        } : {}}
                    >
                        Dislike
                    </span>
                    <span>Reply</span>
                    {comment.edited ? <span>Edited</span> : <></>}
                    <span className={styles.likes_dislikes_wrapper}>
                        {likes > 0 ?
                            <span>
                                <IoIosThumbsUp size={15} />{likes}
                            </span> : <></>
                        }
                        {dislikes > 0 ?
                            <span>
                                <IoIosThumbsDown size={15} />{dislikes}
                            </span> : <></>
                        }
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Comment;
