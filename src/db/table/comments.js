import { db } from '../db';

/**
 * @typedef {object} Comment
 * @property {number} id
 * @property {number} userId
 * @property {string} comment
 * @property {string} changes
 * @property {string} timestamp
 */

/**
 * @typedef {object} CommentDB
 * @property {() => Promise<Comment[]>} getAllComments - Get all comments
 * @property {(id: number) => Promise<Comment>} getComment - Get a comment by id
 * @property {(comment: Comment) => Promise<number>} addComment - Add a new comment
 * @property {(id: number, comment: Comment) => Promise<number>} updateComment - Update a comment by id
 * @property {(id: number) => Promise<void>} deleteComment - Delete a comment by id
 */

/**
 * @type {CommentDB}
 */
export const commentDB = {
    getAllComments: async () => {
        return await db.comments.toArray();
    },

    getComment: async (id) => {
        return await db.comments.get(id);
    },

    addComment: async (comment) => {
        return await db.comments.add(comment);
    },

    updateComment: async (id, comment) => {
        return await db.comments.update(id, comment);
    },

    deleteComment: async (id) => {
        return await db.comments.delete(id);
    },
};