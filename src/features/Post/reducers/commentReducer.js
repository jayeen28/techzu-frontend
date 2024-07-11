import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: true,
    sorting: 'createdAt',
    comments: [],
    pagination: {
        page: 1,
        limit: 10
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
        addComment: (state, action) => {
            if (state.sorting === 'createdAt') {
                state.comments = [action.payload, ...state.comments];
            } else {
                state.comments = [...state.comments, action.payload]
            }
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

export const { setCommentsWithPagination, setLoading, addComment, addReaction, removeReaction } = commentSlice.actions;

export default commentSlice.reducer;