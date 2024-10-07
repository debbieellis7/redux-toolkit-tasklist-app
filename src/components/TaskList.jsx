import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodo, deleteTask } from "../features/taskSlice";
import EditTask from "./EditTask";

const TaskList = () => {
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks.tasks);
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  if (loading) {
    return <p>Tasks loading ...</p>;
  }

  if (error) {
    return <p>There is an error {error}</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Tasks</h2>
      </div>

      <ul className="space-y-4">
        {tasks.map((task, index) => (
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
