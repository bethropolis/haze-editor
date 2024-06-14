<script>
  import { activeMobileCode, settings } from "../../store.js";
  import Code from "./code.svelte";
  import Sidebox from "./sidebox.svelte";
  import Tabs from "../tabs.svelte";
  import { tabOne, tabTwo } from "../../store";
  import PluginEditor from "./pluginEditor.svelte";
  import Emptystate from "../ui/emptystate.svelte";

  let themeEditor = [
    {
      label: "Theme Editor",
      lang: "css",
      placeholder: "write your css code here",
    },
  ];
</script>

{#if !$settings.ThemeEditMode.value}
  <div class={$activeMobileCode ? "s12 m6 l6" : "m l"}>
    <Tabs tabs={$tabOne} options={true}>
      <Code />
    </Tabs>
  </div>

  <div class={$activeMobileCode ? "s6 m l" : "s12 m6 l6"}>
    <Tabs tabs={$tabTwo}>
        <Sidebox/>
    </Tabs>
  </div>
{:else}
  <div class="s12 m6 l6">
    <Tabs tabs={themeEditor} options={false}>
      <PluginEditor />
    </Tabs>
  </div>

  <div class="s6 m l">
    <Emptystate no={3} />
  </div>
{/if}

<style>
  /* your styles go here */
</style>
