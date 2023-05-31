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
      block.innerHTML = span.outerHTML;
    });
  };

  $: code && renderCode();
</script>

<main>
  <pre><code bind:this={block} id="code"></code></pre>
</main>

<style>

</style>