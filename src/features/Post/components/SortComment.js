import React, { useState } from 'react';
import { FaSortAmountDown } from "react-icons/fa";
import styles from '../styles/comment.module.scss';
import Popper from '../../../components/Popper/Popper';
import { useDispatch } from 'react-redux';
import { updateSorting } from '../reducers/commentReducer';

const sortButtons = [
    {
        text: 'Recent',
        value: 'createdAt:desc'
    },
    {
        text: 'Most liked',
        value: 'likes:desc'
    },
    {
        text: 'Most disliked',
        value: 'dislikes:desc'
    }
];

const SortComment = () => {
    const [currentSort, setCurrentSort] = useState(sortButtons[0]);
    const dispatch = useDispatch();

    function handleClick(data) {
        setCurrentSort(data);
        dispatch(updateSorting(data.value));
    }

    return (
        <div className={styles.sortWrapper}>
            <Popper holder={
                <div className={styles.sort_holder}>
                    <span>{currentSort.text}</span>
                    <FaSortAmountDown className={styles.sort_icon} />
                </div>
            }>
                <div className={styles.sortButtonsWrapper}>
                    {
                        sortButtons.map((data) => <span key={data.text} onClick={() => handleClick(data)}>{data.text}</span>)
                    }
                </div>
            </Popper>
        </div>
    );
}

export default SortComment;
