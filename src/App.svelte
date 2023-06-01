<script lang="ts">
  import { active } from "./store.js";
  import Codebox from "./lib/codebox.svelte";
  import Navigation from "./lib/navigation.svelte";
  import Changes from "./lib/changes.svelte";
  import Extension from "./lib/extension.svelte";
</script>

<main>
  <Navigation />
  <div class="grid no-space responsive no-margin">
    {#if $active === "code"}
      <Codebox />
    {/if}
    {#if $active === "changes"}
      <Changes />
    {/if}
    {#if $active === "plugins"}
      <Extension />
    {/if}
    {#if $active === "settings"}
      <p>settings</p>
    {/if}
  </div>
</main>

<style>
</style>
