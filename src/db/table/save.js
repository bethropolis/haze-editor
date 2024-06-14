import { db } from '../db';

/**
 * @typedef {object} Save
 * @property {number} id
 * @property {string} content
 */

/**
 * @typedef {object} SaveDB
 * @property {() => Promise<Save[]>} getAllSaves - Get all saves
 * @property {(id: number) => Promise<Save>} getSave - Get a save by id
 * @property {(save: Save) => Promise<number | string>} addSave - Add a new save
 * @property {(id: number, save: Save) => Promise<number>} updateSave - Update a save by id
 * @property {(id: number) => Promise<void>} deleteSave - Delete a save by id
 */

/**
 * @type {SaveDB}
 */
export const saveDB = {
    /**
     * Get all saves
     * @returns {Promise<Save[]>} - A promise that resolves to an array of saves
     */
    getAllSaves: async () => {
        return await db.save.toArray();
    },

    /**
     * Get a save by id
     * @param {number | string} id - The id of the save
     * @returns {Promise<Save>} - A promise that resolves to the save object
     */
    getSave: async (id) => {
        return await db.save.get(id);
    },



    /**
     * Add a new save
     * @param {Save} save - The save object to add
     * @returns {Promise<number|string>} - A promise that resolves to the ID of the added save
     */
    addSave: async (save) => {
        return await db.save.add(save);
    },



    /**
     * Update a save by id
     * @param {number} id - The id of the save to update
     * @param {Save} save - The updated save object
     * @returns {Promise<number>} - A promise that resolves to the number of updated saves (should be 1)
     */
    updateSave: async (id, save) => {
        return await db.save.update(id, save);
    },

    /**
     * Delete a save by id
     * @param {number} id - The id of the save to delete
     * @returns {Promise<void>} - A promise that resolves when the deletion is complete
     */
    deleteSave: async (id) => {
        return await db.save.delete(id);
    },
};