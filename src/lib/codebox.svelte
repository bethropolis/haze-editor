<script>
  import Code from "./code.svelte";
  import Sidebox from "./sidebox.svelte";
  import Tabs from "./tabs.svelte";
  import { tabOne, tabTwo } from "../store";
</script>

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

<style>
  /* your styles go here */
</style>
