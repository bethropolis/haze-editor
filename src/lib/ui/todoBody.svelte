<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-missing-attribute -->
<script>
  import { onMount } from "svelte";
  import {
    getTodos,
    markAsDone,
    removeTodo,
    editTodo,
    toggleTodo,
    formatTimestamp,
  } from "../../js/todo.js";
  import { customEventStore } from "../../store.js";
  import Sortable from "sortablejs";
  let todos = [];
  let editMode = null;
  let editedText = "";
  let sortableContainer;
  let sortableContainer2;

  async function fetchTodos() {
    todos = [...(await getTodos())];
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

  // Define the container elements as Sortable instances
  onMount(async () => {
    Sortable.create(sortableContainer, {
      group: {
        name: "group1",
        put: true,
      },
      animation: 250,
      handle: ".handle",
      ghostClass: "transparent",
    });

    Sortable.create(sortableContainer2, {
      group: {
        name: "group2",
        put: true,
      },
      animation: 200,
      handle: ".handle",
      onAdd: async (event) => {
        const id = await Number(event.item.dataset.id);
        const todo = await todos.find((todo) => todo.id === id);
        if (todo) {
          await toggle(todo);
        }
      },
      onRemove: async (event) => {

        const id = await Number(event.item.dataset.id);
        const todo = await todos.find((todo) => todo.id === id);
        if (todo) {
          await toggle(todo);
        }
      },
    });
  });

  $: $customEventStore && $customEventStore.name === "add-todo" && fetchTodos();

  fetchTodos();
</script>

<div class="board s6">
  <nav class="small-padding fixed">
    <h5 class="max small">Todos</h5>
    <div>{todos.filter((todo) => !todo.done).length}</div>
  </nav>
  <div class="bring" bind:this={sortableContainer}>
    {#each todos.filter((todo) => !todo.done) as todo}
      {#if editMode === todo.id}
        <article class="{todo.color}2">
          <div class="field border field textarea extra border">
            <textarea bind:value={editedText} class="fill" />
            <span class="helper">Write your new todo to add</span>
          </div>
          <nav>
            <button
              on:click={() => saveEditedTodo(todo)}
              disabled={editedText == ""}
              class="transparent upper"
            >
              <i>save</i>
              <div class="tooltip bottom">Save</div>
            </button>
          </nav>
        </article>
      {:else}
        <article class="{todo.color}2" data-id={todo.id}>
          <h5 class="min small">{todo.text}</h5>
          <nav>
            <a class="" on:click={() => toggle(todo)}>
              <i>done</i>
              <div class="tooltip bottom">Done</div>
            </a>
            <a class="" on:click={() => enableEdit(todo)}>
              <i>edit</i>
              <div class="tooltip bottom">Edit</div>
            </a>
            <a class="" on:click={() => remove(todo)}>
              <i>delete</i>
              <div class="tooltip bottom">Delete</div>
            </a>
            <div class="max" />
            <span class="small">{formatTimestamp(todo.timestamp)}</span>
            <a class="handle">
              <i>drag_indicator</i>
              <div class="tooltip bottom">Drag</div>
            </a>
          </nav>
        </article>
      {/if}
    {/each}
  </div>
</div>

<div class="board s6">
  <nav class="small-padding fixed">
    <h5 class="max small">completed</h5>
    <div>{todos.filter((todo) => todo.done).length}</div>
  </nav>
  <div class="bring" bind:this={sortableContainer2}>
    {#each todos.filter((todo) => todo.done) as todo}
      <article class="{todo.color}2"  data-id={todo.id}>
        <h5 class="min small">{todo.text}</h5>
        <nav>
          <a class="" on:click={() => toggle(todo)}>
            <i>undo</i>
            <div class="tooltip bottom">Undo</div>
          </a>
          <a class="" on:click={() => remove(todo)}>
            <i>delete</i>
            <div class="tooltip bottom">Remove</div>
          </a>
          <div class="max" />
          <span class="small">{formatTimestamp(todo.timestamp)}</span>
          <a class="handle">
            <i>drag_indicator</i>
            <div class="tooltip bottom">Drag</div>
          </a>
        </nav>
      </article>
    {/each}
  </div>
</div>

<style>
  i {
    cursor: pointer;
  }
  i:hover {
    color: var(--active);
  }
  .board {
    position: relative;
    overflow: auto;
    padding-bottom: 1em;
  }
  .board::-webkit-scrollbar,
  textarea::-webkit-scrollbar {
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
    color: #1f1f1f;
  }
</style>
