import { useEffect } from "react";
import req from "../../../lib/req";
import { useDispatch, useSelector } from "react-redux";
import { setCommentsWithPagination, setLoading } from "../reducers/commentReducer";

export default function usePosts() {
    const dispatch = useDispatch();
    const sort = useSelector((store) => store.commentStore.sorting);
    const commentsReloadTrigger = useSelector((store) => store.commentStore.commentsReloadTrigger);
    const { page, limit } = useSelector((store) => store.commentStore.pagination);


    useEffect(() => {
        dispatch(setLoading(true));
        const query = new URLSearchParams({ page: page, limit, sort, post: "1" }).toString();
        req({ uri: `/comment?${query}` })
            .then(({ data }) => dispatch(setCommentsWithPagination(data)))
            .catch((e) => console.log(e.message))
            .finally(() => dispatch(setLoading(false)));
    }, [dispatch, sort, page, limit, commentsReloadTrigger]);

    return {};
}