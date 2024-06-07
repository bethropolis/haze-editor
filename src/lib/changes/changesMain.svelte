<script>
  import Emptystate from "../ui/emptystate.svelte";
  import ChangesMainBody from "./changesMainBody.svelte";
  import Tabs from "../tabs.svelte";
  import { createEventDispatcher } from "svelte";
  import { tabOne } from "../../store";

  export let changes = {};
  export let number;
  let tabs = [];
  let code = null;
  let activeTabIndex = 0;

  const dispatch = createEventDispatcher();
  const updateTabs = async function () {
    let t = [];
    try {
      await changes.files.forEach((change) => {
        let tabObject = {
          label: change,
          lang: change,
        };

        t.push(tabObject);
      });
    } catch (err) {
      return;
    }

    tabs = t;
    updateCode();
  };

  const updateCode = async function () {
    const lang = tabs[activeTabIndex]?.lang;
    const index = $tabOne.findIndex((tab) => tab.lang === lang);
    code = await changes.differences[index];
  };

  const updateActiveIndex = async (event) => {
    await updateTabs();
    activeTabIndex = event.detail;
    await updateCode();
  };

  async function handleSelect(event) {
    await dispatch("select", event.detail);
  }


  $: changes && updateTabs();
</script>

<main>
  {#if changes}
    <Tabs {tabs} options={true} on:tab={updateActiveIndex}>
      <ChangesMainBody bind:code />
    </Tabs>
  {:else if number}
    <Emptystate no={1} on:commit={handleSelect} />
  {:else}
    <Emptystate />
  {/if}
</main>

<style>
</style>
