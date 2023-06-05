<script>
  import { toggleDarkMode } from "../js/editor";


</script>

<slot/>
<button class="circle transparent" on:click={toggleDarkMode}>
  <i>dark_mode</i>
</button>


<style>
  /* your styles go here */
  label {
    font: inherit;
  }
</style>
