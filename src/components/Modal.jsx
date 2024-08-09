import React from 'react'
import ReactModal from 'react-modal'

const Modal = ({ isOpen, onRequestClose, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-overlay"
    >
      {children}
    </ReactModal>
  )
}

export default Modal