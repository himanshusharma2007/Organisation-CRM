import React, { useState } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";

const AddTodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd({ title, description });
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 flex flex-col space-y-2">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo..."
        className="flex-grow mr-2"
      />
      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="resize-none overflow-auto"
        placeholder="Add  description..."
        textarea
      />
      <Button type="submit">Add Todo</Button>
    </form>
  );
};

export default AddTodoForm;
