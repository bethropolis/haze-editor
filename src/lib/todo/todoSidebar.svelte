<script>
  import { createTodo } from "../../js/todo";
  import { customEventStore } from "../../store";

  let todo = "";

  let colors = [
    "purple",
    "pink",
    "orange",
    "lime",
    "teal",
    "blue",
  ];

  let selected = colors[0];
  async function handleClick() {
    await createTodo(todo, selected);
    $customEventStore = { name: "add-todo", data: true };
    todo = "";
  }
</script>

<main>
  <nav class="small-padding">
    <h5 class="max small">Todos</h5>
  </nav>
  <div class="field textarea label border small">
    <textarea bind:value={todo} id="comment" />
    <label for="comment">Write todo</label>
    <span class="helper">Write your new todo to add</span>
  </div>
  <div class="color">
    <details >
      <summary>color: {selected}</summary>
      <ul class="grid large-space wrap">
        {#each colors as color}
          <li
            class="s1 {color}5"
            class:selected={color === selected}
            on:click={() => (selected = color)}
          >
            <div class="tooltip top">{color}</div>
          </li>
        {/each}
      </ul>
    </details>
  </div>
  <div class="small-width center-align">
    <button on:click={handleClick} disabled={todo == ""} class="button upper"
      >Add</button
    >
  </div>
</main>

<style>
  textarea {
    width: 70%;
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
