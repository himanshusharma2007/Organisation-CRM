import React from 'react'
import Modal from '../UI/Modal';
import Input from "../UI/Input";

const ViewTodoModal = ({ isOpen, onClose, todo={} }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Selected Todo">
      <form  className="space-y-4">
        <Input
          label="Title" 
          value={todo?.title}
          onChange={(e) => setTitle(e.target.value)}
          disabled
        />
        <Input label="Description" value={todo?.description} disabled textarea />
      </form>
    </Modal>
  );
};

export default ViewTodoModal
