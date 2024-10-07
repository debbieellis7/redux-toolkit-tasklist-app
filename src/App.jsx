import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-md p-6">
        <AddTask />
        <TaskList />
      </div>
    </div>
  );
}

export default App;
