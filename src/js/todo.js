// @ts-nocheck
import { db } from "../db/db";

// Get all todos
export async function getTodos() {
  let todos = await db.todos.orderBy("timestamp").toArray();
  return todos;
}

// Create a new todo
export async function createTodo(todoText, color = "none") {
  const newTodo = {
    userId: 1,
    text: todoText,
    done: false,
    removed: false,
    color,
    timestamp: Date.now(),
  };
  await db.todos.add(newTodo);
}

// Mark a todo as done
export async function markAsDone(todo) {
  await db.todos.where("id").equals(todo.id).modify({
    done: true,
  });
}

// Remove a todo
export async function removeTodo(todo) {
  await db.todos.where("id").equals(todo.id).delete();
}

// Edit a todo
export async function editTodo(editedTodo) {
  await db.todos.where("id").equals(editedTodo.id).modify({
    text: editedTodo.text,
    color: editedTodo.color,
  });
}

// Toggle a todo done
// Toggle a todo done
export async function toggleTodo(todo) {
  await db.todos.where("id").equals(todo.id).modify({
    done: !todo.done,
  });
}

export function formatTimestamp(timestamp) {
  const elapsedSeconds = Math.floor((Date.now() - timestamp) / 1000);
  if (elapsedSeconds < 60) {
    return elapsedSeconds ? `${elapsedSeconds}s`: "now";
  }

  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  if (elapsedMinutes < 60) {
    return `${elapsedMinutes}m`;
  }

  const elapsedHours = Math.floor(elapsedMinutes / 60);
  if (elapsedHours < 24) {
    return `${elapsedHours}h`;
  }

  const elapsedDays = Math.floor(elapsedHours / 24);
  if (elapsedDays < 7) {
    return `${elapsedDays}d`;
  }

  const elapsedWeeks = Math.floor(elapsedDays / 7);
  if (elapsedWeeks < 52) {
    return `${elapsedWeeks}w`;
  }

  const elapsedYears = Math.floor(elapsedWeeks / 52);
  return `${elapsedYears}y`;
}
