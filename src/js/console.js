import * as loggerModule from "./logger"; // imports log, info, warn and error

/**
 * A logger object that provides a subset of the Console methods.
 * Includes methods for logging messages, informational messages, warnings, and errors.
 * 
 * @type {Pick<Console, "log" | "info" | "warn" | "error">}
 */
const logger = loggerModule;

window.logger = logger;

/**
 * An array of console method names that can be used for logging 
 * and debugging purposes.
 * 
 * @type {Array<keyof Console>}
 */
const CONSOLE_METHODS = ["log", "info", "warn", "error"];

const originalConsole = Object.fromEntries(
  CONSOLE_METHODS.map((method) => [method, console[method].bind(console)])
);

/**
 * Patches the global console object methods to send output to both
 * the original console and a custom logger.
 * 
 * @function
 * @returns {void}
 * 
 * @description
 * For each method name in CONSOLE_METHODS, replaces console[method]
 * with a new function that calls both originalConsole[method] and
 * logger[method] with the same arguments.
 * 
 * @example
 * patchConsole();
 * console.log('Hello world'); // Outputs to both original console and custom logger
 * 
 * @requires {string[]} CONSOLE_METHODS - Array of console method names to patch
 * @requires {Console} originalConsole - Original console object
 * @requires {Object.<string, function>} logger - Custom logger object
 */
export const patchConsole = () => {
  for (const method of CONSOLE_METHODS) {
    console[method] = (...args) => {
        originalConsole[method](...args);
        logger[method](...args);
    };
  }
};

export const restoreConsole = () => {
  for (const method of CONSOLE_METHODS) {
    if (console[method] === logger[method]) {
      console[method] = originalConsole[method];
    }
  }
};

// Initialize console patching
patchConsole();

