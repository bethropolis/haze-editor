import { db } from '../db';

/**
 * @typedef {object} Todo
 * @property {number} id
 * @property {number} userId
 * @property {string} text
 * @property {boolean} done
 * @property {boolean} removed
 * @property {string} color
 * @property {string} timestamp
 */

/**
 * @typedef {object} TodoDB
 * @property {() => Promise<Todo[]>} getAllTodos - Get all todos
 * @property {(id: number) => Promise<Todo>} getTodo - Get a todo by id
 * @property {(todo: Todo) => Promise<number>} addTodo - Add a new todo
 * @property {(id: number, todo: Todo) => Promise<number>} updateTodo - Update a todo by id
 * @property {(id: number) => Promise<void>} deleteTodo - Delete a todo by id
 */

/**
 * @type {TodoDB}
 */
export const todoDB = {
    /**
     * Get all todos
     * @returns {Promise<Todo[]>} - A promise that resolves to an array of todos
     */
    getAllTodos: async () => {
        return await db.todos.toArray();
    },

    /**
     * Get a todo by id
     * @param {number} id - The id of the todo
     * @returns {Promise<Todo>} - A promise that resolves to the todo object
     */
    getTodo: async (id) => {
        return await db.todos.get(id);
    },

    /**
     * Add a new todo
     * @param {Todo} todo - The todo object to add
     * @returns {Promise<number>} - A promise that resolves to the ID of the added todo
     */
    addTodo: async (todo) => {
        return await db.todos.add(todo);
    },

    /**
     * Update a todo by id
     * @param {number} id - The id of the todo to update
     * @param {Todo} todo - The updated todo object
     * @returns {Promise<number>} - A promise that resolves to the number of updated todos (should be 1)
     */
    updateTodo: async (id, todo) => {
        return await db.todos.update(id, todo);
    },

    /**
     * Delete a todo by id
     * @param {number} id - The id of the todo to delete
     * @returns {Promise<void>} - A promise that resolves when the deletion is complete
     */
    deleteTodo: async (id) => {
        return await db.todos.delete(id);
    },
};