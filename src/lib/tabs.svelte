<script>
	import Sideoptions from './Sideoptions.svelte';
  import { customEventStore } from "./../store.js";
  import { lang } from "../store";
  import Options from "./options.svelte";
  export let options = false;
  export let tabs = [];
  export let activeTab = tabs[0].label || null;

  function setActiveTab(tab) {
    activeTab = tab.label;
    if (tab.lang) $lang = tab.lang;
    const info = { name: "update_code", data: null };
    $customEventStore = info;
  }
</script>

<nav class="tabs left-align p-0 sticky large-text">
  {#each tabs as tab}
    <a
      class:active={activeTab === tab.label}
      on:click={() => setActiveTab(tab)}
    >
      <p class="large-text">{tab.label}</p>
    </a>
  {/each}

  <div class="max" />

  {#if options}
    <Options />
  {:else}
  <Sideoptions/>
  {/if}
</nav>

{#each tabs as tab}
  <div class="page {activeTab === tab.label ? 'active' : ''}">
    <slot />
  </div>
{/each}
