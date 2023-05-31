<script>
  import { commitFiles } from "../../js/changes.js";
  import Comments from "./comments.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let comment = "";
  let commentsNumber = 0;
  async function handleclick() {
    let res = await commitFiles(comment);
    !res && alert("something went wrong");
  }

  async function handleSelect(event) {
    await dispatch("select", event.detail);
  }
  async function handleNumber(event) {
    await dispatch("number", event.detail);
    commentsNumber = event.detail;
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
<h5 class="grey-text">Commits.<span class="badge medium-text primary-container fill">{commentsNumber}</span></h5>
    <Comments on:commit={handleSelect} on:number={handleNumber} />
  </div>
</main>

<style>
  main {
    margin-top: 1em;
  }
  .badge{
    top: 50%;
    transform: translate(50%,-50%);
  }
</style>
