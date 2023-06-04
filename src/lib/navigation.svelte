<script>
	import { settings } from './../store.js';
  import { active, navItems } from "../store";
</script>

<nav class="m l left">
  {#each $navItems as item}
    <a
      class:active={$active === item.label}
      on:click={() => ($active = item.label)}
      href="#"
    >
      <i>{item.icon}</i>
      {#if $settings.navLabels.value}
      <span>{item.label}</span>
      {/if}
    </a>
  {/each}
  <div class="max" />
  <a href="#">
    <i class="up">arrow_upward</i>
    <span>back up</span>
  </a>
  <a href="#">
    <i
      class:active={$active === "settings"}
      on:click={() => ($active = 'settings')}>settings</i
    >
  </a>
</nav>
