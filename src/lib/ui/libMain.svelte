<script>
  import { onMount } from "svelte";
  import { db } from "../../db";
  import { customEventStore } from "../../store";

  let libs = [];
  let csslibs = [];
  let jslibs = [];

  async function getLibs() {
    // @ts-ignore
    libs = await db.libs.toArray();
    csslibs = libs.filter((lib) => lib.type === "css");
    console.log("🚀 ~ file: libMain.svelte:14 ~ getLibs ~ csslibs:", csslibs)
    jslibs = libs.filter((lib) => lib.type === "js");
    
  }

  async function editLib(lib) {
    // Perform the edit operation for the selected library
    // Update the library details in the database
    // Implement your logic here
  }

  async function deleteLib(lib) {
    // Perform the delete operation for the selected library
    // Remove the library from the database
    // Implement your logic here
  }
  onMount(() => getLibs()); 

  $: $customEventStore && $customEventStore.name === "add-lib" && getLibs();
</script>

<div class="grid s12 responsive main">
  <div class="s12 large-padding box ">
    <nav>
      <h5>CSS Libraries</h5>
    </nav>
    <div class="ist">
      {#each csslibs as lib}
        <div class="row padding ">
          <label class="checkbox">
            <input type="checkbox" />
            <span />
          </label>
          <div class="max">{lib.file}</div>
          <a on:click={() => deleteLib(lib)}>
            <i>delete</i>
          </a>
        </div>
      {/each}
    </div>
  </div>
  <div class="s12 padding box" id="js">
    <nav>
      <h5>JavaScript Libraries</h5>
    </nav>
    <div class="ist">
      {#each jslibs as lib}
        <div class="row padding">
          <label class="checkbox">
            <input type="checkbox" />
            <span />
          </label>
          <div class="max">{lib.file}</div>
          <a on:click={() => deleteLib(lib)}>
            <i>delete</i>
          </a>
        </div>
      {/each}
    </div>
  </div>
    <div class="s12 row padding">
        <div class="field border max">
            <input type="text" placeholder="add a lib url"/>
          </div>
          <button>Add</button>
    </div>
</div>

<style>
.main{
    height: 100dvh;
}
.box{
    height: 35dvh;
    overflow-y: auto;
}
</style>
