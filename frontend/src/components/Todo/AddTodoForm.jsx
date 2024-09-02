import React, { useState } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";

const AddTodoForm = ({ onAdd, projects }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectName, setProjectName] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd({ title, description, projectName });
      setTitle("");
      setDescription("");
      setProjectName(null);
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
        placeholder="Add description..."
        textarea
      />

      {projects.length > 0 && (
        <select
          value={projectName || ""}
          onChange={(e) => setProjectName(e.target.value)}
          className="p-2 border rounded bg-white text-gray-700"
        >
          <option value="" disabled>
            Select a project
          </option>
          {projects.map((project) => (
            <option key={project._id} value={project.title}>
              {project.title}
            </option>
          ))}
        </select>
      )}

      <Button type="submit">Add Todo</Button>
    </form>
  );
};

export default AddTodoForm;
