<script>
  import { clear, commitFiles } from "../../js/changes.js";
  import { Err } from "../../js/toast.js";
  import Comments from "../ui/comments.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  let commentBox = null;
  let comment = "";
  let commentsNumber = 0;
  async function handleclick() {
    let res = await commitFiles(comment);
    !res && Err("Error committing files");
    commentBox.getComments();
  }

  async function handleSelect(event) {
    await dispatch("select", event.detail);
  }
  async function handleNumber(event) {
    await dispatch("number", event.detail);
    commentsNumber = event.detail;
  }
  async function callClear() {
    let cl = await clear();
    if (cl) await dispatch("select", cl);
  }
</script>

<nav>
  <h5 class="max small">Version Control</h5>
  <button class="circle transparent">
    <i>more_vert</i>
    <menu class="right no-wrap">
      <a on:click={callClear}>Clear VC data</a>
    </menu>
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
    <h5 class="grey-text">
      Commits.<span class="badge medium-text primary-container fill"
        >{commentsNumber}</span
      >
    </h5>
    <Comments
      on:commit={handleSelect}
      on:number={handleNumber}
      bind:this={commentBox}
    />
  </div>
</main>

<style>
  main {
    margin-top: 1em;
  }
  .badge {
    top: 50%;
    transform: translate(50%, -50%);
  }
</style>
