<script>
  import { createEventDispatcher } from 'svelte';
  import { db } from "../../db";

  let comments = [];
  const dispatch = createEventDispatcher();

  // @ts-ignore
  db.comments
    .orderBy("id")
    .reverse()
    .toArray()
    .then(async (rows) => {
      comments = rows;
    });

  function handleArticleClick(event, comment) {
    // Dispatch the 'articleClick' event with the comment as payload
    dispatch('commit', comment);
  }
</script>

<main>
  {#each comments as comment}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <article class="round no-elevate large-width fill" on:click={e => handleArticleClick(e, comment)}>
    <h5>{comment.comment}</h5>
  </article>
  {/each}
</main>

<style>
  main {
    height: 400px;
    overflow-y: auto;
  }

  main::-webkit-scrollbar {
    width: 0;
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

  /* Add hover effect */
  article:hover{
    background-color: var(--primary-container) !important;
  }
</style>
