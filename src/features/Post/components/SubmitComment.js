import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from '../../../components/Toaster';
import useComment from '../hooks/useComment';
import { addComment } from '../reducers/commentReducer';
import CommentInput from './CommentInput';

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

    return (<CommentInput loading={loading} inputRef={inputRef} handleSubmit={handleSubmit} />);
}

export default SubmitComment;
