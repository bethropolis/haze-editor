import { db } from '../db';

/**
 * @typedef {object} Lib
 * @property {number} [id]
 * @property {string} name
 * @property {string} file
 * @property {string} type
 * @property {boolean} active
 */

/**
 * @typedef {object} LibDB
 * @property {() => Promise<Lib[]>} getAllLibs - Get all libs
 * @property {(name: number) => Promise<Lib>} getLib - Get a lib by name
 * @property {(lib: Lib) => Promise<number>} addLib - Add a new lib
 * @property {(name: number, lib: Lib) => Promise<number>} updateLib - Update a lib by name
 * @property {(name: number) => Promise<void>} deleteLib - Delete a lib by name
 */

/**
 * @type {LibDB}
 */
export const libDB = {
    /**
     * Get all libs
     * @returns {Promise<Lib[]>} - A promise that resolves to an array of libs
     */
    getAllLibs: async () => {
        return await db.libs.toArray();
    },

    /**
     * Get a lib by name
     * @param {number} name - The name of the lib
     * @returns {Promise<Lib>} - A promise that resolves to the lib object
     */
    getLib: async (name) => {
        return await db.libs.get(name);
    },

    /**
     * Add a new lib
     * @param {Lib} lib - The lib object to add
     * @returns {Promise<number>} - A promise that resolves to the ID of the added lib
     */
    addLib: async (lib) => {
        return await db.libs.add(lib);
    },

    /**
     * Update a lib by name
     * @param {number} name - The name of the lib to update
     * @param {Lib} lib - The updated lib object
     * @returns {Promise<number>} - A promise that resolves to the number of updated libs (should be 1)
     */
    updateLib: async (name, lib) => {
        return await db.libs.update(name, lib);
    },

    /**
     * Delete a lib by name
     * @param {number} name - The name of the lib to delete
     * @returns {Promise<void>} - A promise that resolves when the deletion is complete
     */
    deleteLib: async (name) => {
        return await db.libs.delete(name);
    },
};