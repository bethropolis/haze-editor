<script>
  import { toggleDarkMode } from "../js/editor";


</script>

<!-- markup (zero or more items) goes here -->
<button class="circle transparent" on:click={toggleDarkMode}>
  <i>dark_mode</i>
</button>
<button class="circle transparent">
  <i>info</i>
</button>


<style>
  /* your styles go here */
  label {
    font: inherit;
  }
</style>
