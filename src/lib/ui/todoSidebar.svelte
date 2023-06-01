<script>
  import { createTodo } from "../../js/todo";

  let todo = '';

  async function handleClick() {
    await createTodo(todo);
    todo = '';
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
  <button on:click={handleClick} disabled={todo == ''} class="button upper ">Add</button>
</main>

<style>
 textarea{
    width: 70%;
 }
</style>

