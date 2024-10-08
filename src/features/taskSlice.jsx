import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  status: "All",
};

export const fetchTodo = createAsyncThunk("tasks/fetchTodo", async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=8",
  );
  const data = await response.json();

  return data.map((task) => ({
    id: task.id,
    title: task.title,
    description: "",
    status: task.completed ? "Completed" : "To Do",
  }));
});

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task,
      );
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    setStatusFilter: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Selectors
const selectTasks = (state) => state.tasks.tasks;
const selectStatus = (state) => state.tasks.status;

// Filter the tasks based on selected status
export const selectFilteredTasks = createSelector(
  [selectTasks, selectStatus],
  (tasks, status) => {
    if (status === "All") return tasks;
    return tasks.filter((task) => task.status === status);
  },
);

export const { addTask, editTask, deleteTask, setStatusFilter } =
  taskSlice.actions;
export default taskSlice.reducer;
