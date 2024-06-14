<script>
  import { activeTab, lang, viewActive } from "../store";
  import Sideoptions from "./code/Sideoptions.svelte";
  import Options from "./code/options.svelte";
  import { onMount, createEventDispatcher } from "svelte";

  export let options = false;
  export let tabs = [];

  export let activeTabIndex = 0;

  const dispatch = createEventDispatcher();

  function setActiveTab(tabIndex) {
    activeTabIndex = tabIndex;
    $activeTab = tabs[tabIndex]?.label;
    tabs[tabIndex]?.lang ? ($lang = tabs[tabIndex]?.lang) : $viewActive = tabs[tabIndex]?.label;
    dispatch("tab", activeTabIndex);
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
        role="tab"
        aria-selected={activeTabIndex === index}
        aria-controls={"tab-panel-" + index}
        title={tab?.label}
      >
        <span class="large-text">{tab?.label}</span>
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
  {#if tab?.label === $viewActive || tab?.label === $lang}
    <div
      class="page"
      class:active={activeTabIndex === index}
      role="tabpanel"
      id={"tab-panel-" + index}
      aria-labelledby={"tab-" + index}
      tabindex={activeTabIndex === index ? 0 : -1}
    >
      <slot />
    </div> 
  {/if}
  {/each}
</div>
