import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: true,
    sorting: 'createdAt:desc',
    comments: [],
    commentsReloadTrigger: false,
    pagination: {
        page: 1,
        limit: 1,
        totalDocs: 0,
    },
};

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        setCommentsWithPagination: (state, action) => {
            const { docs, pagination } = action.payload;
            state.comments = [...state.comments, ...docs];
            state.pagination = { ...pagination, page: state.pagination.page, limit: state.pagination.limit };
        },
        loadMoreComments: (state) => {
            state.pagination = { ...state.pagination, page: state.pagination.page + 1 };
        },
        addComment: (state, action) => {
            if (state.sorting.includes('createdAt')) {
                state.comments = [action.payload, ...state.comments];
            } else {
                state.comments = [...state.comments, action.payload]
            }
            state.pagination.totalDocs += 1;
        },
        removeComment: (state, action) => {
            const comments = state.comments.filter(c => c._id !== action.payload);
            state.comments = comments;
            state.pagination.totalDocs -= 1;
            if (comments.length === 0) state.commentsReloadTrigger = !state.commentsReloadTrigger;
        },
        addReaction: (state, action) => {
            const { _id, data } = action.payload;
            state.comments = state.comments.map((comment) => {
                if (comment._id === _id) {
                    comment = {
                        ...comment,
                        reactions: [
                            ...comment.reactions,
                            data
                        ]
                    };
                    comment[`${data.element}s`] += 1;
                    return comment;
                } else return comment;
            });
        },
        removeReaction: (state, action) => {
            const { _id, data } = action.payload;
            state.comments = state.comments.map((comment) => {
                if (comment._id === _id) {
                    comment.reactions = comment.reactions.filter(r => r.user !== data.userId);
                    comment[`${data.element}s`] -= 1;
                    return comment;
                } else return comment;
            })
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    }
});

export const { setCommentsWithPagination, setLoading, addComment, addReaction, removeReaction, removeComment, loadMoreComments } = commentSlice.actions;

export default commentSlice.reducer;