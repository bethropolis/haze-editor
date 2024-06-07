<script>
  import { viewActive } from "../../store";
  import Emptystate from "../ui/emptystate.svelte";
  import Viewer from "./viewer.svelte";
</script>

<main>
  {#if $viewActive}
    <!-- if == view -->
    {#if $viewActive === "view"}
      <Viewer />
    {:else if $viewActive === "console"}
      <Emptystate no={2} />
    {/if}
  {/if}
</main>

<style>
  main {
    height: 100dvh;
  }
</style>
