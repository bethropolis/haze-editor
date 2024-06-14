<script>
	import { addToTerminal, clearTerminal, terminalContent } from '../../store';
    import { onMount } from 'svelte';

    // Sample terminal content
    // onMount(() => {
    //   addToTerminal('<span style="color: #fde047">[INFO]</span> console calls will be logged here!');
    // });
</script>

<div class="terminal">
    <div class="terminal-bar">
        <div class="terminal-title uppercase">Terminal</div>
        <span class="clear-text" on:click={clearTerminal}>Clear</span>
    </div>
    <div class="console">
        {#each $terminalContent as line, index}
            <div class="line" class:border="{index !== 0}">
                {@html line}
            </div>
        {/each}
    </div>
</div>

<style>
    .terminal {
        font-family: 'Fira Code', monospace;
        font-size: 12px;
        height: calc(100vh - 32px);
        display: flex;
        flex-direction: column;
    }

    .terminal-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 2px 16px;
    }

    .terminal-title {
        font-weight: bold;
        font-size: 14px;
    }

    .clear-text {
        cursor: pointer;
        text-decoration: underline;
        transition: color 0.3s ease;
    }

    .clear-text:hover {
        color: #61afef;
    }

    .console {
        flex-grow: 1;
        overflow-y: auto;
    }

    .line {
        margin-bottom: -1px; /* Remove margin to prevent double borders */
        border: none;
        border-bottom: 1px solid #3e4451; /* Border to distinguish different outputs */
        padding: 2px 8px;
    }

    .line:first-child {
        border-top: none; /* Remove border from the first line */
    }
</style>