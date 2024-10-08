const TaskFilter = ({ status, onChange }) => (
  <select
    className="w-38 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    value={status}
    onChange={onChange}
  >
    <option value="All">All</option>
    <option value="To Do">To Do</option>
    <option value="In Progress">In Progress</option>
    <option value="Completed">Completed</option>
  </select>
);

export default TaskFilter;
