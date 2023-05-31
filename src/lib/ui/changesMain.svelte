<script>
	import Emptystate from './emptystate.svelte';
  import ChangesMainBody from "./changesMainBody.svelte";
  import Tabs from "./../tabs.svelte";
  import { nav } from "../../js/editor";
  export let changes = null;
  export let number;
  let tabs = [];
  let code = null;
  let activeTabIndex = 0;

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

  const toHome = () => {
    nav("code");
  };

  $: changes && updateTabs();
</script>

<main>
  {#if changes}
    <Tabs {tabs} options={true} on:tab={updateActiveIndex}>
      <ChangesMainBody bind:code />
    </Tabs>
  {:else if !number}
     <Emptystate/>
    {:else}
    <Emptystate/>
    
  {/if}
</main>

<style>
</style>
