import React, { useState } from 'react';
import styles from './styles/post.module.scss';
import PostProvider from './context/PostProvider';
import CommentTrigger from './components/CommentTrigger';

const Post = ({ post }) => {
    const MAX_CONTENT_LENGTH = 150;
    const [showFullContent, setShowFullContent] = useState(false);

    const truncatedContent = post.content.length > MAX_CONTENT_LENGTH
        ? post.content.slice(0, MAX_CONTENT_LENGTH) + "..."
        : post.content;

    const handleShowMore = () => {
        setShowFullContent(!showFullContent);
    };

    return (
        <PostProvider>
            <div className={styles.post_wrapper}>
                <div className={styles.author_wrapper}>
                    <div className={styles.author_avatar_wrapper}>
                        <img src={post.author.avatar} alt='avatar' />
                    </div>
                    <div className={styles.author_fullname_wrapper}>
                        <h4>{post.author.fullname}</h4>
                        <small>{post.time}</small>
                    </div>
                </div>
                <p className={styles.content}>
                    {showFullContent ? post.content : truncatedContent}
                    {post.content.length > MAX_CONTENT_LENGTH && (
                        <span className='link' onClick={handleShowMore}>
                            {showFullContent ? "Show Less" : "See More"}
                        </span>
                    )}
                </p>
                <CommentTrigger />
            </div>
        </PostProvider>
    );
}

export default Post;
