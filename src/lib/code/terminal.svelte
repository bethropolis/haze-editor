<script>
  /* ===== IMPORTS ===== */
  import { onMount } from "svelte";
  import JSONTree from "svelte-json-tree";
  import { DB } from "../../db/utils.js";
  import { consoleLogStore } from "../../store.js";

  /* ===== PROPS ===== */
  export let visibleLevels = DB.get("visibleLevels") || {
    log: true,
    info: false,
    warn: false,
    error: false,
  };

  /* ===== TYPE DEFINITIONS ===== */
  /**
   * @typedef {('log' | 'info' | 'warn' | 'error')} LogLevel
   */

  /* ===== REACTIVE VARIABLES ===== */
  /**
   * Array of log levels used in the terminal
   * @type {LogLevel[]}
   */
  let levels = ["log", "info", "warn", "error"];

  /**
   * @type {Array<{ args: any[], level: 'log' | 'info' | 'warn' | 'error', timestamp: Date }>}
   * Changed from 'message' to 'args' array
   */
  let messages = [];

  /** @type {import('svelte/store').Unsubscriber} */
  let unsubscribeMessages;

  /* ===== DOM REFERENCES ===== */
  /** @type {HTMLDivElement | null} */
  let terminalOutput = null;

  /* ===== STORE SUBSCRIPTIONS ===== */
  unsubscribeMessages = consoleLogStore.subscribe((value) => {
    messages = value;
    if (typeof window !== "undefined") {
      requestAnimationFrame(scrollToBottom);
    }
  });

  /* ===== EXPORTED FUNCTIONS ===== */
  export function clearConsole() {
    consoleLogStore.set([]);
  }

  /* ===== HELPER FUNCTIONS ===== */
  function scrollToBottom() {
    if (terminalOutput) {
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
  }

  /**
   * Toggles the visibility of a specific level and updates the database.
   *
   * @param {string} level - The level whose visibility is being toggled.
   */
  function updateVisibleLevels(level) {
    visibleLevels[level] = !visibleLevels[level];
    DB.set("visibleLevels", visibleLevels);
  }

  /* ===== LIFECYCLE ===== */
  onMount(() => {
    return () => {
      if (unsubscribeMessages) unsubscribeMessages();
    };
  });
</script>

<!-- ===== MARKUP ===== -->
<div class="terminal-container">
  <div class="terminal-header">
    <div class="log-filter">
      {#each levels as level}
        <label>
          <input
            type="checkbox"
            checked={visibleLevels[level]}
            on:change={() => updateVisibleLevels(level)}
          />
          {level}
        </label>
      {/each}
    </div>
    <button
      class="clear-button"
      aria-label="Clear Console"
      on:click={clearConsole}>Clear</button
    >
  </div>
  <div
    id="terminal-output"
    bind:this={terminalOutput}
    aria-live="polite"
    aria-atomic="false"
  >
    {#each messages.filter((log) => visibleLevels[log.level]) as logEntry}
      <div
        class="log-item"
        class:log={logEntry.level === "log"}
        class:info={logEntry.level === "info"}
        class:warn={logEntry.level === "warn"}
        class:error={logEntry.level === "error"}
      >
        <!-- <span class="timestamp">{logEntry.timestamp.toLocaleTimeString()}</span> -->
        <span class="log-level" aria-hidden="true">
          {#if logEntry.level === "info"}�{:else if logEntry.level === "warn"}�{:else if logEntry.level === "error"}�{/if}
        </span>
        <div class="log-arguments">
          {#each logEntry.args as arg}
            {#if typeof arg === "string"}
              <pre class="log-item-text {logEntry.level}">{arg}</pre>
            {:else}
              <div class="log-item-json {logEntry.level}">
                <JSONTree value={arg} />
              </div>
            {/if}
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  /* ===== ROOT VARIABLES ===== */
  :root {
    /* Theme-agnostic variables */
    --terminal-padding: 0;
    --terminal-border-radius: 0.25rem;
    --terminal-min-height: 15rem;
    --terminal-max-height: 100%;

    /* Spacing */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 0.75rem;
    --spacing-lg: 1rem;

    --li-identation: 0;

    /* Typography */
    --font-family: monospace;
    --font-size-xs: 0.75rem;
    --font-size-sm: 0.8rem;
    --font-size-base: 0.9rem;
    --line-height-base: 1.3;

    /* Elements */
    --scrollbar-width: 6px;
    --button-padding: var(--spacing-xs) var(--spacing-sm);
    --log-item-gap: var(--spacing-md);
    --timestamp-width: 5em;
    --log-level-width: 1.2em;

    /* Transitions */
    --transition-quick: 0.2s ease;
    --transition-default: 0.3s ease;

    /* JSON tree base styles */
    --json-tree-li-indentation: 1.5em;
    --json-tree-li-line-height: 1.2;
    --json-tree-font-size: var(--font-size-sm);
    --json-tree-font-family: var(--font-family);
  }

  /* ===== THEME STYLES ===== */
  :global(.dark) {
    /* Base Colors */
    --background-color: #282a36;
    --text-color: #f8f8f2;
    --border-color: #44475a;

    /* UI Colors */
    --button-bg-color: #6272a4;
    --button-hover-bg: #8be9fd;
    --header-border-bottom-color: #44475a;

    /* Log Item Colors */
    --log-item-border-bottom: #3b4048;
    --log-item-hover-bg: rgba(98, 114, 164, 0.1);

    /* Button Colors */
    --button-border-color: #6272a4;
    --button-text-color: #f8f8f2;
    --button-hover-bg: #6272a4;
    --button-hover-color: #282a36;

    /* Miscellaneous */
    --timestamp-color: #6d8a88;
    --font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
    --container-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    --scrollbar-track-bg: #282a36;
    --scrollbar-thumb-color: #6272a4;
    --scrollbar-thumb-hover-color: #8be9fd;

    /* Log colors */
    --log-color: #f8f8f2;
    --info-color: #8be9fd;
    --warn-color: #ffb86c;
    --error-color: #ff5555;

    /* JSON tree colors */
    --json-tree-string-color: #f1fa8c;
    --json-tree-symbol-color: #f1fa8c;
    --json-tree-boolean-color: #bd93f9;
    --json-tree-function-color: #50fa7b;
    --json-tree-number-color: #bd93f9;
    --json-tree-label-color: #8be9fd;
    --json-tree-property-color: #ff79c6;
    --json-tree-arrow-color: #6272a4;
    --json-tree-operator-color: #f8f8f2;
    --json-tree-null-color: #ff79c6;
    --json-tree-undefined-color: #ff79c6;
    --json-tree-date-color: #8be9fd;
    --json-tree-internal-color: grey;
    --json-tree-regex-color: #f1fa8c;
  }

  :global(.light) {
    --background-color: #fff;
    --text-color: #383a42;
    --border-color: #d1d5da;

    /* Header Colors */
    --header-bg-color: #f0f0f0;
    --header-text-color: #383a42;
    --header-border-bottom-color: #c8c8c8;

    /* Output Colors */
    --output-bg-color: #fff;
    --scrollbar-track-bg: #fff;
    --scrollbar-thumb-color: #c8c8c8;
    --scrollbar-thumb-hover-color: #999;

    /* Log Item Colors */
    --log-item-border-bottom: #eee;
    --log-item-hover-bg: rgba(0, 0, 0, 0.02);

    /* Button Colors */
    --button-border-color: #d1d5da;
    --button-text-color: #383a42;
    --button-hover-bg: #d1d5da;
    --button-hover-color: #fff;

    /* Miscellaneous */
    --timestamp-color: #999;
    --font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    --container-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    /* Log colors */
    --log-color: #383a42;
    --info-color: #005cc5;
    --warn-color: #d73a49;
    --error-color: #d73a49;

    /* JSON tree colors */
    --json-tree-string-color: #22863a;
    --json-tree-symbol-color: #22863a;
    --json-tree-boolean-color: #986801;
    --json-tree-function-color: #4078f2;
    --json-tree-number-color: #b31d28;
    --json-tree-label-color: #4078f2;
    --json-tree-property-color: #383a42;
    --json-tree-arrow-color: #a0a0a0;
    --json-tree-operator-color: #383a42;
    --json-tree-null-color: #986801;
    --json-tree-undefined-color: #986801;
    --json-tree-date-color: #4078f2;
    --json-tree-internal-color: #a0a0a0;
    --json-tree-regex-color: #22863a;
  }

  :global(span.label) {
    display: inline;
    -webkit-user-select: auto;
    -moz-user-select: auto;
    user-select: auto;
    align-items: auto;
    justify-content: auto;
    padding-left: auto;
    padding-right: auto;
    padding-top: auto;
    padding-bottom: auto;
  }

  /* ===== COMPONENT STRUCTURE ===== */
  .terminal-container {
    display: flex;
    flex-direction: column;
    min-height: var(--terminal-min-height);
    max-height: var(--terminal-max-height);
    height: 100%;
    border-radius: var(--terminal-border-radius);
    font-family: var(--font-family);
    font-size: var(--font-size-base);
    line-height: var(--line-height-base);
    transition:
      background-color var(--transition-default),
      color var(--transition-default),
      border-color var(--transition-default);
  }

  .terminal-header {
    padding: var(--spacing-sm) var(--terminal-padding);
    border-bottom: 1px solid var(--header-border-bottom-color);
    font-size: var(--font-size-sm);
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--header-bg-color);
    color: var(--header-text-color);
  }

  /* ===== OUTPUT AREA ===== */
  #terminal-output {
    flex: 1;
    padding: var(--terminal-padding);
    overflow-y: auto;
    background-color: var(--output-bg-color);
    scrollbar-width: thin;
    scrollbar-color: var(--scrollbar-thumb-color) var(--scrollbar-track-bg);
  }

  /* Scrollbar styling */
  #terminal-output::-webkit-scrollbar {
    width: var(--scrollbar-width);
  }

  #terminal-output::-webkit-scrollbar-track {
    background: var(--scrollbar-track-bg);
  }

  #terminal-output::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-thumb-color);
    border-radius: calc(var(--scrollbar-width) / 2);
  }

  #terminal-output::-webkit-scrollbar-thumb:hover {
    background-color: var(--scrollbar-thumb-hover-color);
  }

  /* ===== LOG ITEMS ===== */
  .log-arguments {
    display: flex;
    flex-direction: row;
    gap: var(--spacing-sm);
    flex-grow: 1;
  }

  .log-item {
    padding: var(--spacing-xs) 0;
    display: flex;
    align-items: center;
    gap: var(--log-item-gap);
    word-break: break-word;
    border-bottom: 1px solid var(--log-item-border-bottom);
    transition: background-color var(--transition-quick);
  }

  .timestamp {
    font-size: var(--font-size-xs);
    width: var(--timestamp-width);
    text-align: right;
    flex-shrink: 0;
    color: var(--timestamp-color);
  }

  .log-level {
    font-size: var(--font-size-sm);
    width: var(--log-level-width);
    align-content: center;
    flex-shrink: 0;
  }

  /* ===== BUTTONS ===== */
  .clear-button {
    background: none;
    border: 1px solid var(--button-border-color);
    padding: var(--button-padding);
    border-radius: var(--terminal-border-radius);
    cursor: pointer;
    font-size: var(--font-size-sm);
    color: var(--button-text-color);
    transition:
      background-color var(--transition-quick),
      color var(--transition-quick),
      border-color var(--transition-quick);
  }

  .clear-button:hover {
    background-color: var(--button-hover-bg);
    color: var(--button-hover-color);
  }

  /* ===== JSON TREE STYLES ===== */
  .log-item-json {
    flex-grow: 1;
  }

  /* Log type specific colors */
  .log.log-item {
    color: var(--log-color);
  }
  .info.log-item {
    color: var(--info-color);
  }
  .warn.log-item {
    color: var(--warn-color);
  }
  .error.log-item {
    color: var(--error-color);
  }

  .log-item-text,
  .log-item-json {
    margin: 0 !important;
    padding: 0;
    font-size: var(--font-size-base);
    border-inline-start: none;
  }

  .log-item-text.log,
  .log-item-json.log {
    color: var(--log-color);
  }

  .log-item-text.info,
  .log-item-json.info {
    color: var(--info-color);
  }

  .log-item-text.warn,
  .log-item-json.warn {
    color: var(--warn-color);
  }

  .log-item-text.error,
  .log-item-json.error {
    --json-tree-label-color: var(--error-color);
    color: var(--error-color);
  }
</style>
