<script>
	import ChangesMain from './ui/changesMain.svelte';
  import { getChanges } from "../js/changes";
  import ChangesSidebar from "./ui/changesSidebar.svelte";
  let changes;
  let commentsNumber = 0;
  async function handleSelect(event) {
    let c = await getChanges(event.detail.id);
    changes = c[0];
  }

  async function handleNumber(event) {
    commentsNumber = event.detail;
  }
$:console.log("🚀 ~ file: changes.svelte:7 ~ commentsNumber:", commentsNumber)
</script>



<div class="s3">
  <ChangesSidebar on:select={handleSelect} on:number={handleNumber} />
</div>
<div class="s9">
  <ChangesMain bind:changes bind:number={commentsNumber}/>
</div>
<style>
</style>
