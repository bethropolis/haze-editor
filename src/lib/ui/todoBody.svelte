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
  let done = [];
  let undone = [];
  let editMode = null;
  let todoDone, todoUndone;
  let editedText = "";
  let sortableContainer;
  let sortableContainer2;

  let colors = ["purple", "pink", "orange", "lime", "teal", "blue"];
  async function fetchTodos() {
    todos = [...(await getTodos())];
    done = todos.filter((todo) => todo.done);
    undone = todos.filter((todo) => !todo.done);
    todoDone = done.length;
    todoUndone = undone.length;
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
      text: editedText || todo.text,
      color: todo.color,
    });
    editMode = null;
    editedText = "";
    await fetchTodos();
  }

  // Define the container elements as Sortable instances
  onMount(async () => {
    Sortable.create(sortableContainer, {
      group: {
        name: "shared",
        put: true,
      },
      animation: 250,
      handle: ".handle",
      ghostClass: "transparent",
      onAdd: async (event) => {
        const id = await Number(event.item.dataset.id);
        const todo = await todos.find((todo) => {
          return todo.id === id;
        });
        if (todo.done) {
          await toggleTodo(todo);
          todoDone = todoDone - 1;
          todoUndone = todoUndone + 1;
        }
      },
      onRemove: async (event) => {
        const id = await Number(event.item.dataset.id);
        let todo = await todos.find((todo) => {
          return todo.id === id;
        });
        if (!todo.done) {
          await toggleTodo(todo);
          todoDone = todoDone + 1;
          todoUndone = todoUndone - 1;
        }
      },
    });

    Sortable.create(sortableContainer2, {
      group: {
        name: "shared",
        put: true,
      },
      animation: 200,
      handle: ".handle",
    });
  });

  $: $customEventStore && $customEventStore.name === "add-todo" && fetchTodos();

  fetchTodos();
</script>

<div class="board s6">
  <nav class="small-padding fixed">
    <h5 class="max small">Todos</h5>
    <div>{todoUndone}</div>
  </nav>
  <div class="bring" bind:this={sortableContainer}>
    {#each undone as todo}
      {#if editMode === todo.id}
        <article class="{todo.color}2">
          <div class="field border field textarea extra border">
            <textarea bind:value={editedText} class="fill" />
            <span class="helper">Write your new todo to add</span>
          </div>
          <div class="color">
            <details>
              <summary>color: {todo.color}</summary>
              <ul class="grid large-space wrap">
                {#each colors as color}
                  <li
                    class="s1 {color}5"
                    class:selected={color === todo.color}
                    on:click={() => (todo.color = color)}
                  >
                    <div class="tooltip top">{color}</div>
                  </li>
                {/each}
              </ul>
            </details>
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
    <div>{todoDone}</div>
  </nav>
  <div class="bring" bind:this={sortableContainer2}>
    {#each done as todo}
      <article class="{todo.color}2" data-id={todo.id}>
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
  ul {
    list-style-type: none;
  }
  .color {
    margin: 2em 0;
  }
  ul li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .selected {
    outline: 3px solid var(--primary-container);
  }
</style>
