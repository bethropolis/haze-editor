<script>
  import { code } from "../../store.js";
  import { commitFiles, getChanges } from "../../js/changes.js";
  import Comments from "./comments.svelte";
  import { createEventDispatcher } from "svelte";
  let comment = "";
  let changes = {};
  async function handleclick() {
    let res = await commitFiles($code.html, $code.css, $code.js, comment);
    !res && alert("something went wrong");
  }
  const dispatch = createEventDispatcher();
  
  async function handleSelect(event) {
    dispatch("select", event.detail);
  }
</script>

<nav>
  <h5 class="max small">Version Control</h5>
  <button class="circle transparent">
    <i>more_vert</i>
  </button>
</nav>

<main class="center-align">
  <div class="field textarea label border large">
    <textarea bind:value={comment} id="comment" />
    <label for="comment">comment</label>
    <span class="helper">write your commit message</span>
  </div>
  <button on:click={handleclick} disabled={comment == ""} class="button upper"
    >commit</button
  >

  <div class="list margin medium-margin">
    <h5 class="grey-text">Commits</h5>
    <Comments on:commit={handleSelect} />
  </div>
</main>

<style>
  main {
    margin-top: 1em;
  }
</style>
