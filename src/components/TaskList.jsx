import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTodo,
  deleteTask,
  setStatusFilter,
  selectFilteredTasks,
} from "../features/taskSlice";
import TaskFilter from "./TaskFilter";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const dispatch = useDispatch();

  const filteredTasks = useSelector(selectFilteredTasks);
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

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Tasks</h2>

        <TaskFilter status={status} onChange={handleStatusChange} />
      </div>

      <ul className="space-y-4">
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
