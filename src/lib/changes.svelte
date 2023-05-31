<script>
	import ChangesMain from './ui/changesMain.svelte';
  import { getChanges } from "../js/changes";
  import ChangesSidebar from "./ui/changesSidebar.svelte";
  let changes;
  async function handleSelect(event) {
    let c = await getChanges(event.detail.id);
    changes = c[0];
  }

</script>



<div class="s3">
  <ChangesSidebar on:select={handleSelect} />
</div>
<div class="s9">
  <ChangesMain bind:changes/>
</div>
<style>
</style>
