import React, { useEffect, useRef, useState } from 'react';
import styles from './popper.module.scss';

/**
 * A reusable React component for creating dropdown menus or poppers.
 *
 * @prop {React.ReactNode} children - The content to be displayed within the popper.
 * @prop {React.ReactNode} holder - The content to be displayed as the popper trigger (e.g., a button, icon).
 * @prop {string} position - The position of the popper relative to the holder. Valid options are: 'top', 'bottom', 'left', or 'right'. Defaults to 'bottom'.
 * @returns {JSX.Element} - The Popper component JSX element.
 */
const Popper = ({ children, holder, position = 'bottom' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);
    const holderRef = useRef(null);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    /**
     * Handles clicks outside of the specified content area, closing a dropdown or menu.
     *
     * @param {MouseEvent} event - The click event object.
     * @returns {void}
     */
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
