<script>
  export let code = null;

  let block = null;

  const renderCode = () => {
  if (!block) return;
  const fragment = document.createDocumentFragment();
  code.forEach((part) => {
    const span = document.createElement('span');
    const br = document.createElement('br');
    span.textContent = part.value;
    if (part.added) {
      const lines = span.textContent.split('\n');
      for (let i = 0; i < lines.length - 1; i++) {
        if(lines[i].trim() == '') continue;
        lines[i] = '+ ' + lines[i];
      }
      span.textContent = lines.join('\n');
      span.classList.add('added');
    }
    if (part.removed) {
      const lines = span.textContent.split('\n');
      for (let i = 0; i < lines.length ; i++) {
        if(lines[i].trim() == '') continue;
        lines[i] = '- ' + lines[i];
      }
      span.textContent = lines.join('\n');
      span.classList.add('removed');
    }
    fragment.appendChild(span);
    fragment.appendChild(br);
  });
  block.innerHTML = '';
  block.appendChild(fragment);
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