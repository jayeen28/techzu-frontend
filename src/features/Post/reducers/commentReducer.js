import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: true,
    comments: [],
    pagination: {},
};

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        setCommentsWithPagination: (state, action) => {
            const { docs, pagination } = action.payload;
            state.comments = [...state.comments, ...docs];
            state.pagination = pagination;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    }
});

export const { setCommentsWithPagination, setLoading } = commentSlice.actions;

export default commentSlice.reducer;