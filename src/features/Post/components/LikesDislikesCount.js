import React from 'react';
import styles from '../styles/comment.module.scss';
import { IoIosThumbsDown, IoIosThumbsUp } from 'react-icons/io';

const LikesDislikesCount = ({ likes, dislikes }) => {
    return (
        <span className={styles.likes_dislikes_wrapper}>
            {likes > 0 ?
                <span>
                    <IoIosThumbsUp size={15} />{likes}
                </span> : <></>
            }
            {dislikes > 0 ?
                <span>
                    <IoIosThumbsDown size={15} />{dislikes}
                </span> : <></>
            }
        </span>
    );
}

export default LikesDislikesCount;
