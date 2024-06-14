import { db } from '../db';

/**
 * @typedef {object} Change
 * @property {number} id
 * @property {number} commentId
 * @property {string} files
 * @property {string} differences
 */

/**
 * @typedef {object} ChangeDB
 * @property {() => Promise<Change[]>} getAllChanges - Get all changes
 * @property {(id: number) => Promise<Change[]>} getChange - Get a change by id
 * @property {(change: Change) => Promise<number>} addChange - Add a new change
 * @property {(id: number, change: Change) => Promise<number>} updateChange - Update a change by id
 * @property {(id: number) => Promise<void>} deleteChange - Delete a change by id
 */

/**
 * @type {ChangeDB}
 */
export const changeDB = {
    getAllChanges: async () => {
        return await db.changes.toArray();
    },

    getChange: async (id) => {
        return await db.changes.where("commentId")
        .equals(id)
        .toArray();
    },

    addChange: async (change) => {
        return await db.changes.put(change);
    },

    updateChange: async (id, change) => {
        return await db.changes.update(id, change);
    },

    deleteChange: async (id) => {
        return await db.changes.delete(id);
    },
};