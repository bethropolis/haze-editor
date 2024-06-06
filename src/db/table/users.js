import { db } from '../db';

/**
 * @typedef {object} User
 * @property {number} [id]
 * @property {string} username
 */

/**
 * @typedef {object} UserDB
 * @property {() => Promise<User[]>} getAllUsers - Get all users
 * @property {(id: number) => Promise<User>} getUser - Get a user by id
 * @property {(user: User) => Promise<number>} addUser - Add a new user
 * @property {(id: number, user: User) => Promise<number>} updateUser - Update a user by id
 * @property {(id: number) => Promise<void>} deleteUser - Delete a user by id
 */

/**
 * @type {UserDB}
 */
export const userDB = {
    /**
     * Get all users
     * @returns {Promise<User[]>} - A promise that resolves to an array of users
     */
    getAllUsers: async () => {
        return await db.users.toArray();
    },

    /**
     * Get a user by id
     * @param {number} id - The id of the user
     * @returns {Promise<User>} - A promise that resolves to the user object
     */
    getUser: async (id) => {
        return await db.users.get(id);
    },

    /**
     * Add a new user
     * @param {User} user - The user object to add
     * @returns {Promise<number>} - A promise that resolves to the ID of the added user
     */
    addUser: async (user) => {
        return await db.users.add(user);
    },

    /**
     * Update a user by id
     * @param {number} id - The id of the user to update
     * @param {User} user - The updated user object
     * @returns {Promise<number>} - A promise that resolves to the number of updated users (should be 1)
     */
    updateUser: async (id, user) => {
        return await db.users.update(id, user);
    },

    /**
     * Delete a user by id
     * @param {number} id - The id of the user to delete
     * @returns {Promise<void>} - A promise that resolves when the deletion is complete
     */
    deleteUser: async (id) => {
        await db.users.delete(id);
    },
};