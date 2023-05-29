<script>
    import { viewActive } from "../store";
  import Viewer from "./viewer.svelte";

  </script>
  <main>
{#if $viewActive}
  <!-- if == view -->
  {#if $viewActive === "view"}
    <Viewer/>
  {/if}
{/if}
  </main>
  <style>
    main{
        height: 100dvh;
    }
  </style>