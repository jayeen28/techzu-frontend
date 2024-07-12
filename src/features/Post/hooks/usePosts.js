import { useEffect } from "react";
import req from "../../../lib/req";
import { useDispatch, useSelector } from "react-redux";
import { addComment, setCommentsWithPagination, setLoading } from "../reducers/commentReducer";
import { useSocket } from "../../../context/SocketProvider";

export default function usePosts() {
    const dispatch = useDispatch();
    const sort = useSelector((store) => store.commentStore.sorting);
    const commentsReloadTrigger = useSelector((store) => store.commentStore.commentsReloadTrigger);
    const { page, limit } = useSelector((store) => store.commentStore.pagination);
    const socket = useSocket();
    const userId = useSelector((store) => store.userStore.user._id);

    useEffect(() => {
        dispatch(setLoading(true));
        const query = new URLSearchParams({ page: page, limit, sort, post: "1" }).toString();
        req({ uri: `/comment?${query}` })
            .then(({ data }) => dispatch(setCommentsWithPagination(data)))
            .catch((e) => console.log(e.message))
            .finally(() => dispatch(setLoading(false)));

        socket.on('new_comment', (comment) => {
            if (comment.user._id !== userId) dispatch(addComment(comment));
        });

        return () => {
            socket.off('new_comment');
        }

    }, [dispatch, sort, page, limit, commentsReloadTrigger, socket, userId]);

    return {};
}