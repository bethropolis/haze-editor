<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-missing-attribute -->
<script>
  import {
    getTodos,
    markAsDone,
    removeTodo,
    editTodo,
    toggleTodo,
  } from "../../js/todo.js";

  let todos = [];
  let editMode = null;
  let editedText = "";

  async function fetchTodos() {
    todos = await getTodos();
  }

  async function markTodoAsDone(todo) {
    await markAsDone(todo);
    await fetchTodos();
  }

  async function remove(todo) {
    await removeTodo(todo);
    await fetchTodos();
  }
  async function toggle(todo) {
    await toggleTodo(todo);
    await fetchTodos();
  }

  function enableEdit(todo) {
    editMode = todo.id;
    editedText = todo.text;
  }

  async function saveEditedTodo(todo) {
    await editTodo({
      ...todo,
      text: editedText,
    });
    editMode = null;
    editedText = "";
    await fetchTodos();
  }

  fetchTodos();
</script>

<div class="board s6">
  <nav class="small-padding fixed">
    <h5 class="max small">Todos</h5>
  </nav>
  {#each todos.filter((todo) => !todo.done) as todo}
    {#if editMode === todo.id}
      <article>
        <div class="field border field textarea extra border">
          <textarea bind:value={editedText} />
          <span class="helper">Write your new todo to add</span>
        </div>
        <nav>
          <button on:click={() => saveEditedTodo(todo)}  disabled={editedText == ''} class="transparent upper">
            <i>save</i>
            <div class="tooltip top">Save</div>
          </button>
        </nav>
      </article>
    {:else}
      <article>
        <h5 class="min small">{todo.text}</h5>
        <nav>
          <a class="" on:click={() => toggle(todo)}>
            <i>done</i>
            <div class="tooltip top">Done</div>
          </a>
          <a class="" on:click={() => enableEdit(todo)}>
            <i>edit</i>
            <div class="tooltip top">Edit</div>
          </a>
          <a class="" on:click={() => remove(todo)}>
            <i>delete</i>
            <div class="tooltip top">Delete</div>
          </a>
        </nav>
      </article>
    {/if}
  {/each}
</div>

<div class="board s6">
  <nav class="small-padding fixed">
    <h5 class="max small">completed</h5>
  </nav>
  {#each todos.filter((todo) => todo.done) as todo}
    <article>
      <h5 class="min small">{todo.text}</h5>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <nav>
        <a class="" on:click={() => toggle(todo)}>
          <i>undo</i>
          <div class="tooltip top">Undo</div>
        </a>
        <a class="" on:click={() => remove(todo)}>
          <i>delete</i>
          <div class="tooltip top">Remove</div>
        </a>
      </nav>
    </article>
  {/each}
</div>

<style>
  i {
    cursor: pointer;
  }
  .board {
    position: relative;
    overflow: auto;
    padding-bottom: 1em;
  }
  .board::-webkit-scrollbar, textarea::-webkit-scrollbar{
    display: none;
  }
  .fixed {
    position: sticky;
    top: 0;
    width: 100%;
    background-color: var(--background);
    z-index: 3;
  }
  article {
    width: 90%;
  }
</style>
