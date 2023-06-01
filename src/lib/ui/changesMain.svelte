<script>
  import Emptystate from "./emptystate.svelte";
  import ChangesMainBody from "./changesMainBody.svelte";
  import Tabs from "./../tabs.svelte";
  import { nav } from "../../js/editor";
  import { createEventDispatcher } from "svelte";

  export let changes = null;
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
    code = await changes.differences[activeTabIndex];
  };

  const updateActiveIndex = async (event) => {
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
