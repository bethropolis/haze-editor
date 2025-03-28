<script>
  import { viewActive } from "../../store";
  import Terminal from "./terminal.svelte";
  import Viewer from "./viewer.svelte";
</script>

<main>
  {#if $viewActive}
    <!-- if == view -->
    {#if $viewActive === "view"}
      <Viewer />
    {:else if $viewActive === "console"}
       <Terminal/>
    {/if}
  {/if}
</main>

<style>
  main {
    height: 100dvh;
  }
</style>
