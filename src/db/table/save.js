import { db } from '../db';

/**
 * @typedef {object} Save
 * @property {number} id
 * @property {string} content
 */

/**
 * @typedef {object} SaveDB
 * @property {() => Promise<Save[]>} getAll - Get all saves
 * @property {(id: number) => Promise<Save>} get - Get a save by id
 * @property {(save: Save) => Promise<number | string>} add - Add a new save
 * @property {(id: number, save: Save) => Promise<number>} update - Update a save by id
 * @property {(id: number) => Promise<void>} delete - Delete a save by id
 */

/**
 * @type {SaveDB}
 */
export const saveDB = {
    /**
     * Get all saves
     * @returns {Promise<Save[]>} - A promise that resolves to an array of saves
     */ 
    getAll: async () => {
        return await db.save.toArray();
    },

    /**
     * Get a save by id
     * @param {number | string} id - The id of the save
     * @returns {Promise<Save>} - A promise that resolves to the save object
     */
    get: async (id) => {
        const save = await db.save.get(id);
        if (!save) {
            throw new Error(`Save with id ${id} not found`);
        }
        return save;
    },

    /**
     * Add a new save
     * @param {Save} save - The save object to add
     * @returns {Promise<number|string>} - A promise that resolves to the ID of the added save
     */
    add: async (save) => {
        return await db.save.add(save);
    },

    /**
     * Update a save by id
     * @param {number} id - The id of the save to update
     * @param {Save} save - The updated save object
     * @returns {Promise<number>} - A promise that resolves to the number of updated saves (should be 1)
     */
    update: async (id, save) => {
        return await db.save.update(id, save);
    },

    /**
     * Delete a save by id
     * @param {number} id - The id of the save to delete
     * @returns {Promise<void>} - A promise that resolves when the deletion is complete
     */
    delete: async (id) => {
        return await db.save.delete(id);
    },
};
