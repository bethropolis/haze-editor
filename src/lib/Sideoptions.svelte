<script>
  import { toggleDarkMode } from "../js/editor";


</script>

<slot/>
<button class="circle transparent" on:click={toggleDarkMode}>
  <i>dark_mode</i>
  <div class="tooltip bottom">
    Toggle dark mode
  </div>
</button>


<style>
  /* your styles go here */
  label {
    font: inherit;
  }
</style>
