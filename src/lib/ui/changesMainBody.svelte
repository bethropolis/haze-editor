<script>
  export let code = null;

  let block = null;

  const renderCode = () => {
    if (!block) return
    block.innerHTML = '';
    code.forEach((part) => {
      const span = document.createElement('span');
      span.textContent = part.value;
      if (part.added) {
        span.classList.add('added');
      }
      if (part.removed) {
        span.classList.add('removed');
      }
      block.innerHTML += span.outerHTML;
    });
  };

  $: code && renderCode();
</script>

<main>
  {#if code}
  <pre><code bind:this={block} id="code"></code></pre>
 
  {/if}
</main>

<style>
pre {
  width: 100%;
  overflow-x: auto;
  height: calc(100vh - 70px); /* set a maximum height to limit the size of the pre element */
}
  pre::-webkit-scrollbar {
    width: 0;
    height: 8px;
  }

  pre::-webkit-scrollbar-thumb {
    background-color: var(--inverse-primary);
    border-radius: 1px;
  }

  pre::-webkit-scrollbar-track {
    background-color: var(--background);
  }

</style>