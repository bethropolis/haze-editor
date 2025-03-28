import { consoleLogStore } from "../store";

/**
 * The key used to store terminal logs in local storage.
 * @constant {string}
 */
const STORAGE_KEY = "terminal-logs";

/**
 * Logs a args to the console with a specific level.
 *
 * @param {any} args - The args to be logged.
 * @param {'log' | 'info' | 'warn' | 'error'} level - The log level. Defaults to 'log'.
 */
function logToConsole(level = "log", ...args) {

  consoleLogStore.update(logs => [...logs, {
    args: [...args], 
    level: level,
    timestamp: new Date()
  }]);
}

// Convenience functions for different log levels
/**
 * Logs a args with a 'log' level.
 * @param {any} args - The args to log.
 */
export const log = (...args) => logToConsole("log", ...args);

/**
 * Logs a args with an 'info' level.
 * @param {any} args - The args to log.
 */
export const info = (...args) => logToConsole("info", ...args);

/**
 * Logs a args with a 'warn' level.
 * @param {any} args - The args to log.
 */
export const warn = (...args) => logToConsole("warn", ...args);

/**
 * Logs a args with an 'error' level.
 * @param {any} args - The args to log.
 */
export const error = (...args) => logToConsole("error", ...args);