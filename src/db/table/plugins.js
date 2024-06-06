import { db } from '../db';

// plugins: "++id,&name, content,type, file,active",


/**
 * @typedef {object} Plugin
 * @property {number} [id]
 * @property {string} name
 * @property {string} content
 * @property {string} type
 * @property {string} file
 * @property {boolean} active
 */



/**
 * @typedef {object} PluginDB
 * @property {() => Promise<Plugin[]>} getAllPlugins - Get all plugins
 * @property {(type: string) => Promise<Plugin[]>} getPluginForType - Get plugins for a specific type
 * @property {(id: number | string) => Promise<Plugin | Plugin[]>} getPlugin - Get a plugin by id or name
 * @property {(plugin: Plugin) => Promise<number>} addPlugin - Add a new plugin
 * @property {(id: number, plugin: Plugin) => Promise<number>} updatePlugin - Update a plugin by id
 * @property {(id: number) => Promise<void>} deletePlugin - Delete a plugin by id
 */




/**
 * @type {PluginDB}
 */
export const pluginDB = {
    /**
     * Get all plugins
     * @returns {Promise<Plugin[]>} - Array of plugins
     */
    getAllPlugins: async () => {
        return await db.plugins.toArray();
    },

    /**
     * Get plugins for a specific type
     * @param {string} type - Plugin type
     * @returns {Promise<Plugin[]>} - Array of plugins
     */
    getPluginForType: async (type) => {
        return await db.plugins.where('type').equals(type).toArray();
    },

    /**
     * Get a plugin by id or name
     * @param {number} id - Plugin id or name
     * @returns {Promise<Plugin | Plugin[]>} - Plugin or array of plugins
     */
    getPlugin: async (id) => {
            return await db.plugins.get(id);
    },

    /**
     * Add a new plugin
     * @param {Plugin} plugin - Plugin object
     * @returns {Promise<number>} - Id of the added plugin
     */
    addPlugin: async (plugin) => {
        return await db.plugins.add(plugin);
    },

    /**
     * Update a plugin by id
     * @param {number} id - Plugin id
     * @param {Plugin} plugin - Updated plugin object
     * @returns {Promise<any>} - Id of the updated plugin
     */
    updatePlugin: async (id, plugin) => {
        return await db.plugins.update(id, plugin);
    },

    /**
     * Delete a plugin by id
     * @param {number} id - Plugin id
     * @returns {Promise<void>} - Id of the deleted plugin
     */
    deletePlugin: async (id) => {
        return await db.plugins.delete(id);
    },
};