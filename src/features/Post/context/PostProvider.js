import React, { createContext, useContext } from 'react';
import usePosts from '../hooks/usePosts';

const postContext = createContext();

const PostProvider = ({ children }) => {
    const value = usePosts();
    return (
        <postContext.Provider value={value}>
            {children}
        </postContext.Provider>
    );
}

export default PostProvider;

export const usePostsCtx = () => useContext(postContext);
