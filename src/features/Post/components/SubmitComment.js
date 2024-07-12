import React, { useRef, useState } from 'react';
import { IoSend } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { toast } from '../../../components/Toaster';
import useComment from '../hooks/useComment';
import { addComment } from '../reducers/commentReducer';
import styles from '../styles/comment.module.scss';

const SubmitComment = () => {
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();
    const dispatch = useDispatch();
    const { submitComment } = useComment();

    const handleSubmit = () => {
        const content = inputRef.current.value;
        if (!content) return inputRef.current.focus();
        setLoading(true);
        submitComment(content)
            .then(({ data }) => {
                dispatch(addComment(data));
                inputRef.current.value = '';
            })
            .catch((e) => {
                console.log(e);
                toast('Something went wrong!', 'error');
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className={styles.submitComment}>
            <textarea type="text" placeholder='Type your comment' required ref={inputRef} />
            {
                loading ? '...' : <IoSend className={styles.submitCommentIcon} onClick={handleSubmit} />
            }
        </div>
    );
}

export default SubmitComment;
