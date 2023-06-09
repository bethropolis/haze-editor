<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { db } from "../../db";

  let comments = [];
  const dispatch = createEventDispatcher();

  export async function getComments() {
    // @ts-ignore
    await db.comments
      .orderBy("id")
      .reverse()
      .toArray()
      .then(async (rows) => {
        comments = rows;
      });
  }
  function handleArticleClick(event, comment) {
    // Dispatch the 'articleClick' event with the comment as payload
    dispatch("commit", comment);
  }

  function sendNumber() {
    dispatch("number", comments.length);
  }

  onMount(async () => {
    await sendNumber();
    await getComments();
  });

  $: comments && sendNumber();
</script>

<main>
  {#each comments as comment}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <article
      class="round no-elevate large-width fill comment-item"
      on:click={(e) => handleArticleClick(e, comment)}
    >
      <h5 class="tertiary-text">{comment.comment}</h5>
      <div class="control">
      <span class="added">++{comment.changes?.added||0}</span>
      <span class="removed">--{comment.changes?.removed||0}</span>
      </div>
    </article>
  {/each}
</main>

<style>
  main {
    height: 400px;
    overflow-y: auto;
  }

  main::-webkit-scrollbar {
    width: 0.1em;
  }

  main::-webkit-scrollbar-thumb {
    background-color: var(--secondary-container);
    border-radius: 1px;
  }

  main::-webkit-scrollbar-track {
    background-color: var(--background);
  }

  /* Customize the typography of h5 */
  article h5 {
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }
  

  article{
    cursor: pointer;
    display: flex;
    justify-content: space-between;
  }
  .control {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 50%;
  }
  .control > span{
    background-color: transparent !important;
  }

  /* Add hover effect */
  article:hover {
    background-color: var(--inverse-primary) !important;
  }
</style>
