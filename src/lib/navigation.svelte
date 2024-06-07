<script>
	import { settings } from './../store.js';
  import { active, navItems } from "../store";
</script>
<svelte:head>
  <title>{$active}</title>
</svelte:head>
<nav class="m l left" >
  {#each $navItems as item}
    <a
      class:active={$active === item.label}
      on:click={() => ($active = item.label)}
      href="#{item.label}"
    >
      <i>{item.icon}</i>
      {#if $settings.navLabels.value}
      <span>{item.label}</span>
      {:else}
      <div class="tooltip right">{item.label}</div>
      {/if}
    </a>
  {/each}
  <div class="max" />
  {#if $settings.backUpButton.value}
  <a href="#" title="">
    <i class="up">arrow_upward</i>
   <div class="tooltip right">back up</div>
  </a>
  {/if}
  <a href="#settings">
    <i
      class:active={$active === "settings"}
      on:click={() => ($active = 'settings')}>settings</i
    >
  </a>
</nav>


<nav class="s bottom min t no-space no-padding" >
  {#each $navItems as item}
    <a
      class:active={$active === item.label}
      on:click={() => ($active = item.label)}
      href="#{item.label}"
    >
      <i class="tiny">{item.icon}</i>
      {#if $settings.navLabels.value}
      <span class="small-text">{item.label}</span>
      {:else}
      <div class="tooltip top">{item.label}</div>
      {/if}
    </a>
  {/each}

  <a href="#settings">
    <i class="tiny"
      class:active={$active === "settings"}
      on:click={() => ($active = 'settings')}>settings</i
    >
    {#if $settings.navLabels.value}
      <span class="small-text">settings</span>
      {:else}
      <div class="tooltip top">settings</div>
      {/if}
  </a>
</nav>


<style>
  nav.bottom{
    height: auto;
  }
</style>


