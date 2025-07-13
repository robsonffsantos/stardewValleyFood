import React from 'react'
import ReactModal from 'react-modal'

const Modal = ({ isOpen, onRequestClose, children }) => {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            ariaHideApp={false}
            className="fixed inset-0 flex items-center justify-center p-3 sm:p-4 z-50"
            overlayClassName="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
        >
            <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-sm sm:max-w-md w-full mx-2 border border-amber-100">
                {children}
            </div>
        </ReactModal>
    )
}

export default Modal
