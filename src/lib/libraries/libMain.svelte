<script>
  import { onMount } from "svelte";
  import { db } from "../../db/db";
  import { customEventStore } from "../../store";
  import { Err } from "../../js/toast";
  import Sideoptions from "../code/Sideoptions.svelte";
  import { cacheFile } from "../../js/cache";

  let csslibs = [];
  let jslibs = [];
  let libUrl = "";
  let activeTab = "css";

  async function getLibs() {
    const libs = await db.libs.toArray();
    csslibs = libs.filter((lib) => lib.type === "css");
    jslibs = libs.filter((lib) => lib.type === "js");
  }

  async function toggleActivate(lib) {
    const updatedLib = { ...lib, active: !lib.active };
    await db.libs.update(lib.id, updatedLib);
    await getLibs();
  }

  async function deleteLib(lib) {
    await db.libs.delete(lib.id);
    await getLibs();
  }

  const libAdd = async function () {
    let type = libUrl.split(".").pop();
    if (type === "css" || type === "js") {
      // @ts-ignore
      db.libs.add({
        name: libUrl,
        file: libUrl,
        type,
        active: true,
      });
      getLibs();
      await cacheFile(libUrl);
    } else {
      Err("Only CSS and JS libraries are supported");
    }
  };

  onMount(async () => {
    await getLibs();
  });

  $: $customEventStore && $customEventStore.name === "add-lib" && getLibs();
</script>

<div class="s12 responsive main">
  <nav class="s12">
    <div class="max" />
    <Sideoptions />
  </nav>
  <div>
    <div class="tabs left-align min">
      <a href="#lubraries@css" class:active={activeTab == "css"} on:click={()=>activeTab = "css"}>CSS</a>
      <a href="#lubraries@js"  class:active={activeTab == "js"} on:click={()=>activeTab = "js"}>Javascript</a>
    </div>
    <div class="page padding  left" class:active={activeTab == "css"}>
      <div class="list fill">
        {#if csslibs.length > 0}
        {#each csslibs as lib}
          <div class="row padding">
            <label class="checkbox" on:click={() => toggleActivate(lib)} on:keydown={() => {}}>
              <input type="checkbox" checked={lib.active} />
              <span />
            </label>
            <div class="max">{lib.file}</div>
            <a href="#delete" on:click={() => deleteLib(lib)} class="red-text" >
              <i>delete</i>
            </a>
          </div>
        {/each}
        {:else}
          <p class="blue-text">Note: all libraries are cached on addition</p>
        {/if}
      </div>
    </div>
    <div class="page padding left" class:active={activeTab == "js"}>
      <div class="list fill">
        {#if jslibs.length > 0}
          {#each jslibs as lib}
            <div class="row padding">
              <label class="checkbox" on:click={() => toggleActivate(lib)}  on:keydown={() => {}}>
                <input type="checkbox" checked={lib.active} />
                <span />
              </label>
              <div class="max">{lib.file}</div>
              <a href="#delete" on:click={() => deleteLib(lib)} class="red-text">
                <i>delete</i>
              </a>
            </div>
          {/each}
        {:else}
          <p class="blue-text">Note: all libraries are cached on addition</p>
        {/if}
      </div>
    </div>
  </div>
 
  <div class="s12 row padding input-container">
    <div class="field border max">
      <input type="text" placeholder="Add a library URL" bind:value={libUrl} />
    </div>
    <button on:click={libAdd}>Add</button>
  </div>
</div>

<style>
  .main {
    padding: 10px;
    position: relative;
    height: calc(100dvh - 20dvh);
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }



  .list {
    min-height: 200px;
    height: 100%;
    overflow-y: auto;
    padding: 1em 5px;
  }

  .list::-webkit-scrollbar {
    width: 8px;
  }

  .list::-webkit-scrollbar-track {
    background-color: #f5f5f5;
    border-radius: 10px;
  }

  .list::-webkit-scrollbar-thumb {
    background-color: var(--primary);
    border-radius: 10px;
    height: 10px;
  }

  .list::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }

  .list::-webkit-scrollbar-thumb:active {
    background-color: #333;
  }

  .list::-webkit-scrollbar-button {
    display: none;
  }

  .list::-webkit-scrollbar-corner {
    background-color: transparent;
  }

  .padding {
    padding: 1rem;
  }

  .input-container {
    height: fit-content;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    position: absolute;
    bottom: 0;
    z-index: 20;
  }
</style>
