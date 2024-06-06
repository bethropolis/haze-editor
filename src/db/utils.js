
/**
 * Database utility functions for storing and retrieving data from localStorage.
 */
export const DB = {
  
    /**
     * Sets the value for the given key in localStorage.
     * @param {string} key - The key to set.
     * @param {any} value - The value to store.
     * @returns {void}
     */
    set: (key, value) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
  
    /**
     * Retrieves the value for the given key from localStorage.
     * @param {string} key - The key to retrieve.
     * @returns {any} - The retrieved value, or null if the key doesn't exist.
     */
    get: (key) => {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    },
  
    /**
     * Updates the value for the given key in localStorage.
     * @param {string} key - The key to update.
     * @param {any} value - The new value to set.
     * @returns {void}
     */
    update: (key, value) => {
      const currentValue = DB.get(key);
      if (currentValue !== null) {
        DB.set(key, value);
      }
    },
  
    /**
     * Removes the value for the given key from localStorage.
     * @param {string} key - The key to remove.
     * @returns {void}
     */
    remove: (key) => {
      localStorage.removeItem(key);
    },
  
    /**
     * Clears all values stored in localStorage.
     * @returns {void}
     */
    clear: () => {
      localStorage.clear();
    },
  };
  