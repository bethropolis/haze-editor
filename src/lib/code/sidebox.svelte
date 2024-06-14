<script>
  import { viewActive } from "../../store";
  import Console from "./console.svelte";
  import Viewer from "./viewer.svelte";
</script>

<main>
  {#if $viewActive}
    <!-- if == view -->
    {#if $viewActive === "view"}
      <Viewer />
    {:else if $viewActive === "console"}
      <Console />
    {/if}
  {/if}
</main>

<style>
  main {
    height: 100dvh;
  }
</style>
