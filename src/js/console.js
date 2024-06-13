// console-override.js
import { addToTerminal } from "../store.js";

const originalConsole = { ...console };

const consoleHandler = {
  get(target, property, receiver) {
    const originalMethod = target[property];

    if (typeof originalMethod === 'function') {
      return (...args) => {
        originalMethod.apply(target, args);
        addToTerminal(`<span style="color: #0ea5e9">[${property.toUpperCase()}]</span> ${args.join(' ')}`);
      };
    }

    return originalMethod;
  }
};



export function overrideGlobalConsole() {
  if (typeof window !== 'undefined') {
    window.console = new Proxy(originalConsole, consoleHandler);
  } 
}

export function restoreGlobalConsole() {
  if (typeof window !== 'undefined') {
    window.console = originalConsole;
  } 
}