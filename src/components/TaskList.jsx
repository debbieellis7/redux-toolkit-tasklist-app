import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodo, deleteTask, setStatusFilter } from "../features/taskSlice";
import EditTask from "./EditTask";

const TaskList = () => {
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks.tasks);
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);
  const status = useSelector((state) => state.tasks.status);

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  const handleStatusChange = (e) => {
    dispatch(setStatusFilter(e.target.value));
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  if (loading) {
    return <p>Tasks loading ...</p>;
  }

  if (error) {
    return <p>There is an error {error}</p>;
  }

  // Filter the tasks based on selected status
  const filteredTasks = tasks.filter((task) => {
    if (status === "All") {
      // Show all tasks
      return true;
    }

    // Show filtered tasks
    return task.status === status;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Tasks</h2>

        <select
          className="w-38 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={status}
          onChange={handleStatusChange}
        >
          <option value="All">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <ul className="space-y-4">
        {filteredTasks.map((task, index) => (
          <li
            key={index}
            className="bg-gray-50 p-4 rounded-md shadow-sm flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-medium text-gray-800">
                {task.title}
              </h3>

              {task.description && (
                <p className="text-gray-600">{task.description}</p>
              )}

              <p className="mt-1 text-sm font-semibold">
                Status: <span className="italic underline">{task.status}</span>
              </p>
            </div>

            <div className="flex space-x-2">
              <EditTask task={task} />
              <button
                className="px-3 py-1.5 bg-red-500 text-white font-semibold border-b-4 border-red-700 hover:bg-red-400 hover:border-red-500 rounded-lg shadow-md transition duration-300 ease-in-out"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
