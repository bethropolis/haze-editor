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
      href="#"
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
  <a href="#">
    <i
      class:active={$active === "settings"}
      on:click={() => ($active = 'settings')}>settings</i
    >
  </a>
</nav>
