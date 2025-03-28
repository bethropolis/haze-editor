<script lang="ts">
  import { active } from "./store.js";
  import Codebox from "./lib/code/codebox.svelte";
  import Navigation from "./lib/navigation.svelte";
  import Changes from "./lib/changes/changes.svelte";
  import Extension from "./lib/plugins/extension.svelte";
  import Todos from "./lib/todo/todos.svelte";
  import Libraries from "./lib/libraries/libraries.svelte";
  import Settings from "./lib/settings/settings.svelte";

  

</script>

<main>
  <Navigation />
  <div class="grid no-space responsive no-margin">
    {#if $active === "code"}
      <Codebox />
    {/if}
    {#if $active === "Libraries"}
      <Libraries />
    {/if}
    {#if $active === "changes"}
      <Changes />
    {/if}
    {#if $active === "Todo"}
      <Todos />
    {/if}
    {#if $active === "plugins"}
      <Extension />
    {/if}
    {#if $active === "settings"}
      <Settings />
    {/if}
  </div>
</main>

<style>
  main {
    height: 100vh;
  }
</style>
