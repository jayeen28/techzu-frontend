import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useModal } from '../../context/ModalProvider';
import styles from './modalShell.module.scss';

/**
 * This component injects the modal in the target element with createPortal function.
 * @param {String} modalKey The key of the modal jsx which is stored in modals state.
 * @returns createPortal returns a React node that can be included into JSX or returned
 * from a React component. If React encounters it in the render output, it will place
 * the provided children inside the provided domNode.
 */
export default function ModalShell({ modalKey, i }) {
    const { modals, closeModal } = useModal();
    const modalRef = useRef();

    useEffect(() => {
        const modalHandler = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                closeModal(modalKey);
            }
        };
        const actualHandler = (Object.keys(modals).length - 1 === i) ? modalHandler : () => { };
        document.addEventListener('mousedown', actualHandler);
        return () => document.removeEventListener('mousedown', actualHandler);
    }, [modalKey, modals, closeModal, i]);

    return (
        ReactDOM.createPortal(
            <div className={styles.modal_shell_wrapper}>
                <div className={styles.modal_shell} ref={modalRef}>{modals[modalKey]}</div>
            </div>,
            document.getElementById('modal'),
        )
    );
}
