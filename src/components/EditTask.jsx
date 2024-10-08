import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editTask } from "../features/taskSlice";

const EditTask = ({ task }) => {
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  // Update state whenever task prop changes
  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
  }, [task]);

  const handleEdit = () => {
    dispatch(
      editTask({
        id: task.id,
        title,
        description,
        status,
      })
    );
    setIsEdit(false);
  };

  return (
    <div>
      {isEdit ? (
        <div className="absolute bg-white p-4 border rounded-md shadow-lg z-10">
          <h2 className="text-x1 font-semibold mb-3 text-green-500">
            Edit Task
          </h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Task Title"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Task Description"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus-ring-2 focus:ring-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
            />
          </div>
          <div className="mb-4">
            <select
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="flex flex-col space-y-2">
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-1.5 px-3 rounded-lg hover:bg-green-400 border-b-4 border-green-700 hover:border-green-500 shadow-md transition duration-300 ease-in-out"
              onClick={handleEdit}
            >
              Save
            </button>
            <button
              className="w-full bg-gray-500 text-white py-1.5 px-3 rounded-lg hover:bg-gray-400 border-b-4 border-gray-700 hover:border-gray-500 shadow-md transition duration-300 ease-in-out"
              onClick={() => setIsEdit(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          className="px-3 py-1.5 bg-blue-500 text-white font-semibold border-b-4 border-blue-700 hover:bg-blue-400 hover:border-blue-500 rounded-lg shadow-md transition duration-300 ease-in-out"
          onClick={() => setIsEdit(true)}
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default EditTask;
