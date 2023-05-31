<script>
  import Sideoptions from "./Sideoptions.svelte";
  import { activeTab, lang } from "../store";
  import Options from "./options.svelte";
  import { onMount, createEventDispatcher } from "svelte";

  export let options = false;
  export let tabs = [];

  export let activeTabIndex = 0;

  const dispatch = createEventDispatcher();

  function setActiveTab(tabIndex) {
    activeTabIndex = tabIndex;
    $activeTab = tabs[tabIndex]?.label;
    if (tabs[tabIndex]?.lang) $lang = tabs[tabIndex]?.lang;
    dispatch('tab', activeTabIndex);
  }

  onMount(() => {
    const index = tabs.findIndex((tab) => tab.label === $activeTab);
    setActiveTab(index !== -1 ? index : 0);
  });
</script>

<nav class="tabs left-align p-0 large-text">
  {#if tabs.length > 0}
    {#each tabs as tab, index}
      <a
        class:active={activeTabIndex === index}
        on:click={() => setActiveTab(index)}
      >
        <p class="large-text">{tab?.label}</p>
      </a>
    {/each}
  {/if}
  <div class="max" />

  {#if options}
    <Options />
  {:else}
    <Sideoptions />
  {/if}
</nav>

<div class="page-container">
  {#each tabs as tab, index}
    <div class="page" class:active={activeTabIndex === index}>
      <slot />
    </div>
  {/each}
</div>
