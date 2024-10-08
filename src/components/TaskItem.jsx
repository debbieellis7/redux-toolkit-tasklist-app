import EditTask from "./EditTask";

const TaskItem = ({ task, onDelete }) => (
  <li
    key={task.id}
    className="bg-gray-50 p-4 rounded-md shadow-sm flex justify-between items-center"
  >
    <div>
      <h3 className="text-lg font-medium text-gray-800">{task.title}</h3>

      {task.description && <p className="text-gray-600">{task.description}</p>}

      <p className="mt-1 text-sm font-semibold">
        Status: <span className="italic underline">{task.status}</span>
      </p>
    </div>

    <div className="flex space-x-2">
      <EditTask task={task} />
      <button
        className="px-3 py-1.5 bg-red-500 text-white font-semibold border-b-4 border-red-700 hover:bg-red-400 hover:border-red-500 rounded-lg shadow-md transition duration-300 ease-in-out"
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>
    </div>
  </li>
);

export default TaskItem;
