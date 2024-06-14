import { db } from '../db';

/**
 * @typedef {object} File
 * @property {number} id
 * @property {string} content
 */

/**
 * @typedef {object} FileDB
 * @property {() => Promise<File[]>} getAllFiles - Get all files
 * @property {(id: number) => Promise<File>} getFile - Get a file by id
 * @property {(file: File) => Promise<number>} addFile - Add a new file
 * @property {(file: File[]) => Promise<number>} addBulk - Add a new files
 * @property {(id: number, file: File) => Promise<number>} updateFile - Update a file by id
 * @property {(id: number) => Promise<void>} deleteFile - Delete a file by id
 */

/**
 * @type {FileDB}
 */
export const fileDB = {
    /**
     * Get all files
     * @returns {Promise<File[]>} - A promise that resolves to an array of files
     */
    getAllFiles: async () => {
        return await db.files.toArray();
    },

    /**
     * Get a file by id
     * @param {number} id - The id of the file
     * @returns {Promise<File>} - A promise that resolves to the file object
     */
    getFile: async (id) => {
        return await db.files.get(id);
    },

    /**
     * Add a new file
     * @param {File} file - The file object to add
     * @returns {Promise<number>} - A promise that resolves to the ID of the added file
     */
    addFile: async (file) => {
        return await db.files.add(file);
    },

    addBulk: async (files) => {
        return await db.files.bulkPut(files);
    },

    /**
     * Update a file by id
     * @param {number} id - The id of the file to update
     * @param {File} file - The updated file object
     * @returns {Promise<number>} - A promise that resolves to the number of updated files (should be 1)
     */
    updateFile: async (id, file) => {
        return await db.files.update(id, file);
    },



    /**
     * Delete a file by id
     * @param {number} id - The id of the file to delete
     * @returns {Promise<void>} - A promise that resolves when the deletion is complete
     */
    deleteFile: async (id) => {
        await db.files.delete(id);
    },
};