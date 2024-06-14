<script>
  import ChangesMain from "./changesMain.svelte";
  import { getChanges } from "../../js/changes";
  import ChangesSidebar from "./changesSidebar.svelte";
  
  let changes;
  let commentsNumber = 1;
  async function handleSelect(event) {
    let c = null;
    if (event.detail == "latest") {
      c = await getChanges(commentsNumber);
    } else {
      c = await getChanges(event.detail.id);
    }

    changes = c[0];
  }

  async function handleNumber(event) {
    commentsNumber = event.detail;
  }
</script>

<div class="s12 m6 l3">
  <ChangesSidebar on:select={handleSelect} on:number={handleNumber} />
</div>
<div class="s9 m l">
  <ChangesMain
    bind:changes
    bind:number={commentsNumber}
    on:select={handleSelect}
  />
</div>

<style>
</style>
