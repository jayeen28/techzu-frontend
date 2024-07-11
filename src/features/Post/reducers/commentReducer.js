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
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    }
});

export const { setCommentsWithPagination, setLoading, addComment } = commentSlice.actions;

export default commentSlice.reducer;