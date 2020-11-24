import React from 'react';
import CustomButton from '../custom-button/Custom-button';
import Modal from 'react-bootstrap/Modal';

export default function CustomModal({
  isOpen,
  handleClose,
  handleDeletePost,
  type,
}) {
  return (
    <div>
      <Modal show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {' '}
            {type === 'delete' ? (
              <i className="trash alternate icon"></i>
            ) : (
              <i className="info circle icon"></i>
            )}
            {type === 'delete' ? 'Delete Post' : 'Info'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {' '}
          {type === 'delete'
            ? 'Are you sure you want to delete?'
            : 'Do you want to report this post?'}
        </Modal.Body>
        <Modal.Footer>
          <CustomButton bgColor="#6c757d" onClick={handleClose}>
            <i className="remove icon"></i> No
          </CustomButton>
          {type === 'delete' ? (
            <CustomButton bgColor="#db2828" onClick={handleDeletePost}>
              <i className="checkmark icon"></i> Yes
            </CustomButton>
          ) : (
            <CustomButton bgColor="#21ba45" onClick={handleClose}>
              <i className="checkmark icon"></i> Yes
            </CustomButton>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
