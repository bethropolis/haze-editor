<script>
  import { settings } from "./../store.js";
  import Code from "./code.svelte";
  import Sidebox from "./sidebox.svelte";
  import Tabs from "./tabs.svelte";
  import { tabOne, tabTwo } from "../store";
  import PluginEditor from "./pluginEditor.svelte";
  import Emptystate from "./ui/emptystate.svelte";

</script>
{#if !$settings.ThemeEditMode.value }
<div class="s12 m6 l6">
  <Tabs tabs={$tabOne} options={true}>
    <Code />
  </Tabs>
</div>

<div class="s6 m l">
  <Tabs tabs={$tabTwo}>
    <Sidebox />
  </Tabs>
</div>
{:else}
<div class="s12 m6 l6">
  <Tabs tabs={[$tabOne[1]]} options={true}>
    <PluginEditor/>
  </Tabs>
</div>

<div class="s6 m l">
  <Tabs>
    <Emptystate no={3} slot="x"/>
  </Tabs>
</div>
{/if}

<style>
  /* your styles go here */
</style>
