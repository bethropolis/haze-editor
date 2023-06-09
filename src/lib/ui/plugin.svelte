<script>
  import { onMount } from "svelte";
  import { DB, db } from "../../db";
  import {
    applyThemeCSS,
    executePluginScript,
    installPlugin,
    removePlugin,
    unloadPlugin,
  } from "../../js/plugin";

  export let plugin;
  let isInstalled = false;
  export let choosen = "";

  function Install() {
    let i = installPlugin(plugin);
    if (i) isInstalled = true;
  }

  function Activate() {
    if (plugin.type === "theme") {
      applyThemeCSS(plugin);
    } else if (plugin.type === "plugin") {
      executePluginScript(plugin);
    }
    choosen = plugin.name;
  }

  async function unload() {
    await unloadPlugin(plugin);
    isInstalled = true;
    choosen = "";
    return
  }

  async function remove() {
    if(!isInstalled) return;
    if(choosen === plugin.name) await unload();
    removePlugin(plugin);
    isInstalled = false;
  }

  onMount(() => {
    // @ts-ignore
    db.plugins
      .where("name")
      .equals(plugin.name)
      .toArray()
      .then((plugin) => {
        if (plugin.length > 0) {
          isInstalled = true;
        }
      });
  });
</script>

{#if plugin}
  <article class="primary-container s3 medium-width wrap small-margin">
<button class="chip circle absolute transparent top right">
  <i>more_vert</i>
  <menu class="left no-wrap">
    <a on:click={()=> remove()}> Remove</a>
  </menu>
</button>
    <div class="row">
      <div class="circle">
        {#if plugin.type === "plugin"}
        <i class="large">extension</i>
        {:else if plugin.type === "theme"}
        <i class="large">
          format_paint</i>
        {/if}
      </div>
      <div class="max">
        <h5>{plugin.name}</h5>
        <p>{plugin.description}</p>
      </div>
    </div>
    <div class="badge-list small-margin medium-space">
      <span>By @{plugin.author|| "unknown"}</span>
      <span>{plugin.version}</span>
      {#if plugin.dev}
        <span class="green5 white-text dev">dev</span>
      {/if}
    </div>
    <div class="small-margin">
      {#if !isInstalled}
        <button class="primary" on:click={Install}>install {plugin.type}</button
        >
      {:else if choosen === plugin.name}
        <button class="error" on:click={unload}>unload {plugin.type} </button>
      {:else if isInstalled}
        <!-- apply theme CSS -->
        <button class="tertiary" on:click={Activate}
          >{plugin.type === "theme" ? "apply" : "activate"}
          {plugin.type}</button
        >
      {/if}
    </div>
  </article>
{/if}

<style>
  .badge-list{
    display: flex;
    justify-content: space-between;
  }
  .dev{
    font-size: 1rem;
    font-family: sans-serif;
    padding: 5px;
    height: 30px;
  }
</style>