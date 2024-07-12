import React from 'react';
import { useSelector } from 'react-redux';
import useComment from '../hooks/useComment';
import Comment from './Comment';


const CommentWrapper = ({ comment }) => {
    const userId = useSelector((state) => state.userStore.user._id);
    const { handleRemoveComment, handleReaction } = useComment({ comment, userId });


    return <Comment comment={comment} userId={userId} handleReaction={handleReaction} handleRemoveComment={handleRemoveComment} />;
}

export default CommentWrapper;
