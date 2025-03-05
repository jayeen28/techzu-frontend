import { useDispatch } from "react-redux";
import { toast } from "../../../components/Toaster";
import req from "../../../lib/req";
import { addReaction, addReplies, removeComment, removeReaction } from "../reducers/commentReducer";

let reactionDebouncerTimeout;
const REACTION_DEBOUCE_TIME = 500;

export default function useComment({ comment, userId } = {}) {
    const dispatch = useDispatch();

    function handleRemoveComment() {
        req({ method: 'DELETE', uri: `/comment/${comment._id}` })
            .then(() => dispatch(removeComment(comment._id)))
            .catch(e => {
                console.log(e.message);
                toast('Something went wrong!', 'error');
            })
    };

    function handleReaction(react, myReaction) {
        if (myReaction) return;
        clearTimeout(reactionDebouncerTimeout);
        reactionDebouncerTimeout = setTimeout(() => {
            dispatch(addReaction({ _id: comment._id, data: { user: userId, element: react } }));
            req({ method: 'PATCH', uri: `/comment/react/${comment._id}/${react}` })
                .then(() => { })
                .catch(e => {
                    dispatch(removeReaction({ _id: comment._id, data: { userId, element: react } }));
                    console.log(e.message);
                    toast('Something went wrong!', 'error');
                })
        }, REACTION_DEBOUCE_TIME);
    };

    function submitComment(content, replyOf = null) {
        return req({ method: 'POST', uri: '/comment/1', data: { content, ...replyOf && { replyOf } } })
    };

    function updateComment(content) {
        return req({ method: 'PATCH', uri: `/comment/edit/${comment._id}`, data: { content } })
    };

    function showReplies(setLoading) {
        const query = new URLSearchParams({ post: "1", replyOf: comment._id, page: 1, limit: comment.replyCount, sort: 'createdAt:asec' }).toString();
        req({ uri: `/comment?${query}` })
            .then(({ data }) => dispatch(addReplies(data.docs)))
            .catch((e) => console.log(e.message))
            .finally(() => setLoading(false));
    }

    return {
        handleRemoveComment,
        handleReaction,
        submitComment,
        updateComment,
        showReplies
    }
}