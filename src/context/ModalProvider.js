import React, { createContext, useContext, useState } from 'react';

const modalContext = createContext();

/**
 * This hook is used for managing the modals.
 * @returns {Object} modals - the state of the modal which is
 * the JSX elememt to be shown when the modal is called.
 * @returns {Fuction} open - this function passes the JSX
 * element to be displayed to the modal state.
 * @returns {Function} close - this function removes the JSX element from the modal state.
 */
function useModalHook() {
    const [modals, setModals] = useState({});

    function openModal(key, jsx) {
        setModals((prev) => ({ ...prev, [key]: jsx }));
    }

    function closeModal(key) {
        setModals((prev) => {
            const clonedPrev = { ...prev };
            delete clonedPrev[key];
            return clonedPrev;
        });
    }

    return {
        modals,
        openModal,
        closeModal,
    };
}

const ModalProvider = ({ children }) => {
    const value = useModalHook();
    return (
        <modalContext.Provider value={value}>{children}</modalContext.Provider>
    );
}

export default ModalProvider;

export const useModal = () => useContext(modalContext);
