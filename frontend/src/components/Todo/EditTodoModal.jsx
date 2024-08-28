import React, { useState, useEffect } from "react";
import Modal from "../UI/Modal";
import Input from "../UI/Input";
import Button from "../UI/Button";

const EditTodoModal = ({ isOpen, onClose, onSave, todo }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description || "");
    }
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(todo._id, { title, description });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Todo">
      <form method="post" onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Input
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          textarea
        />
        <div className="flex justify-end space-x-2">
          <Button type="button" onClick={onClose} className="bg-gray-500">
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTodoModal;
