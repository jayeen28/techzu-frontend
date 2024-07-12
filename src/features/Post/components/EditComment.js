import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/comment.module.scss';
import CommentInput from './CommentInput';
import useComment from '../hooks/useComment';
import { toast } from '../../../components/Toaster';
import { useDispatch } from 'react-redux';
import { editComment } from '../reducers/commentReducer';

const EditComment = ({ editMode, setEditMode, comment }) => {
    const { updateComment } = useComment({ comment });
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();

    useEffect(() => {
        if (editMode) {
            inputRef.current.value = comment.content;
        }
    }, [editMode, comment.content]);

    const handleSubmit = () => {
        const content = inputRef.current.value;
        if (!content || content === comment.content) return inputRef.current.focus();
        const previousValue = comment.content;
        setLoading(true);
        dispatch(editComment({ _id: comment._id, content }));
        updateComment(content)
            .then()
            .catch((e) => {
                console.log(e.message);
                toast('Something went wrong!', 'error');
                dispatch(editComment({ _id: comment.id, content: previousValue, edited: false }));
            })
            .finally(() => {
                setLoading(false);
                setEditMode(false);
            });

    }

    return (
        <div>
            <CommentInput style={{ padding: '0px' }} inputRef={inputRef} handleSubmit={handleSubmit} loading={loading} />
            <p className={styles.cancelEdit} onClick={() => setEditMode(false)}>Cancel</p>
        </div>
    );
}

export default EditComment;
