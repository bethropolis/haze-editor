<script lang="ts">
  import Code from "./lib/code.svelte";
  import Navigation from "./lib/navigation.svelte";
  import Sidebox from "./lib/sidebox.svelte";
  import Tabs from "./lib/tabs.svelte";
  import { tabOne, tabTwo } from "./store";
</script>

<main>
  <Navigation />

  <div class="grid no-space responsive max">
    <div class="s6">
      <Tabs tabs={$tabOne} options={true}>
         <Code />
      </Tabs>
    </div>
    <div class="s6">
      <Tabs tabs={$tabTwo} >
        <Sidebox/>
      </Tabs>
    </div>
  </div>
</main>

<style>
</style>
