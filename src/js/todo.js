let todos = [
  { id: 1, text: "Example Todo 1", done: false },
  { id: 2, text: "Example Todo 2", done: true },
];

// Get all todos
export async function getTodos() {
  return todos;
}

// Create a new todo
export async function createTodo(todoText) {
  const newTodo = {
    id: todos.length + 1,
    text: todoText,
    done: false,
  };
  todos.push(newTodo);
}

// Mark a todo as done
export async function markAsDone(todo) {
  const index = todos.findIndex((t) => t.id === todo.id);
  if (index !== -1) {
    todos[index].done = true;
  }
}

// Remove a todo
export async function removeTodo(todo) {
  todos = todos.filter((t) => t.id !== todo.id);
}

// Edit a todo
export async function editTodo(editedTodo) {
  const index = todos.findIndex((t) => t.id === editedTodo.id);
  if (index !== -1) {
    todos[index].text = editedTodo.text;
  }
}

// Toggle a todo done
// Toggle a todo done
export async function toggleTodo(todo) {
  const index = todos.findIndex(({ id }) => id === todo.id);
  if (index >= 0) {
    todos[index].done = !todo.done;
  }
}
