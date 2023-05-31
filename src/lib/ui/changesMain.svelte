<script>
  import ChangesMainBody from "./changesMainBody.svelte";
  import Tabs from "./../tabs.svelte";
  export let changes = null;
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
  }

  $: changes && updateTabs();
</script>

<main>
  {#if changes}
    <Tabs {tabs} options={true} on:tab={updateActiveIndex}>
      <ChangesMainBody bind:code />
    </Tabs>
  {/if}
</main>

<style>
  /* your styles go here */
</style>
