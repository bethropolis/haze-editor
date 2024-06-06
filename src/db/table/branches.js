import { db } from '../db';

/**
 * @typedef {object} Branch
 * @property {number} [id]
 * @property {string} branch
 * @property {string} user
 */

/**
 * @typedef {object} BranchDB
 * @property {() => Promise<Branch[]>} getAllBranches - Get all branches
 * @property {(branch: number) => Promise<Branch>} getBranch - Get a branch by name
 * @property {(branch: Branch) => Promise<number>} addBranch - Add a new branch
 * @property {(branch: number, branchData: Branch) => Promise<number>} updateBranch - Update a branch by name
 * @property {(branch: number) => Promise<void>} deleteBranch - Delete a branch by name
 */

/**
 * @type {BranchDB}
 */
export const branchDB = {
    getAllBranches: async () => {
        return await db.branches.toArray();
    },

    getBranch: async (branch) => {
        return await db.branches.get(branch);
    },

    addBranch: async (branch) => {
        return await db.branches.add(branch);
    },

    updateBranch: async (branch, branchData) => {
        return await db.branches.update(branch, branchData);
    },

    deleteBranch: async (branch) => {
        return await db.branches.delete(branch);
    },
};