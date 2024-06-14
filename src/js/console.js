// console-override.js
import { addToTerminal } from "../store.js";

const originalConsole = { ...console };

const consoleHandler = {
  get(target, property, receiver) {
    const originalMethod = target[property];

    if (typeof originalMethod === 'function') {
      return (...args) => {
        originalMethod.apply(target, args);
        addToTerminal(`<span style="color: var(--tertiary)">[${property.toUpperCase()}]</span> ${args.join(' ')}`);
      };
    }

    return originalMethod;
  }
};



const customConsole = new Proxy(originalConsole, consoleHandler);


  // Listen for messages from the iframe
  window.addEventListener('message', function(event) {
    if (event.data.type) {
      const message = `${event.data.message}\n`;
      customConsole[event.data.type](message);  
    }
  }, false); 