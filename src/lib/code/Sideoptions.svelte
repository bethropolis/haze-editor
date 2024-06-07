<script>
  import { toggleDarkMode } from "../../js/editor";
  import { activeMobileCode } from "../../store";


</script>

<slot/>
<button class="circle transparent s" on:click={()=> $activeMobileCode = !$activeMobileCode}>
  <i>code</i>
  <div class="tooltip bottom">code</div>
</button>

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
