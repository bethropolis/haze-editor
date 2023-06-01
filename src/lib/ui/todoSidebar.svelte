<script>
    // similar to src/lib/ui/changesSidebar.svelte but this is for todos
    let todo = "";

    async function handleclick() {
        
    }
</script>



<main class="center-align">
    <nav class="small-padding">
        <h5 class="max small">Todos</h5>
      </nav>
    <div class="field textarea label border large">
      <textarea bind:value={todo} id="comment" />
      <label for="comment">write todo</label>
      <span class="helper">write your new todo to add</span>
    </div>
    <button on:click={handleclick} disabled={todo == ""} class="button upper"
      >Add</button
    >
  </main>

  <style>
    .badge{
      top: 50%;
      transform: translate(50%,-50%);
    }
  </style>