import React, { useEffect, useRef, useState } from 'react';
import styles from './popper.module.scss';

const Popper = ({ children, holder, position = 'bottom' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);
    const holderRef = useRef(null);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (
            contentRef.current &&
            !contentRef.current.contains(event.target) &&
            holderRef.current &&
            !holderRef.current.contains(event.target)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={`${styles.popper_wrapper} ${position}`}>
            <div className={styles.popper_holder} onClick={handleClick} ref={holderRef}>
                {holder}
            </div>
            {isOpen && (
                <div className={styles.popper_content} ref={contentRef}>
                    {children}
                </div>
            )}
        </div>
    );
};

export default Popper;
