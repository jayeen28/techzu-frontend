import { useEffect } from "react";
import req from "../../../lib/req";
import { useDispatch } from "react-redux";
import { setCommentsWithPagination, setLoading } from "../reducers/commentReducer";

export default function usePosts() {
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(setLoading(true));
        req({ uri: '/comment?page=1&limit=5' })
            .then(({ data }) => dispatch(setCommentsWithPagination(data)))
            .catch((e) => console.log(e.message))
            .finally(() => dispatch(setLoading(false)));
    }, [dispatch]);

    return {};
}