<script lang="ts">
  import { active } from "./store.js";
  import Codebox from "./lib/codebox.svelte";
  import Navigation from "./lib/navigation.svelte";
  import Changes from "./lib/changes.svelte";
  import Extension from "./lib/extension.svelte";
  import Todos from "./lib/todos.svelte";
  import Libraries from "./lib/libraries.svelte";
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
    <!-- {#if $active ===  "Todo"}
      <Todos/>
    {/if} -->
    <div class="s12 grid" style:display={$active == "Todo"? '':'none'}>
      <Todos/>
    </div>
    {#if $active === "plugins"}
      <Extension />
    {/if}  
    {#if $active === "settings"}
      <p>settings</p>
    {/if}
  </div>
</main>

<style>
  main{
    height: 100vh;
  }
</style>
