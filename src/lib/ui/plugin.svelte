<script>
  import { onMount } from "svelte";
  import { db } from "../../db";
  import { applyThemeCSS, executePluginScript, installPlugin } from "../../js/plugin";

  export let plugin;
  let isInstalled = false;

  function Install() {
    let i = installPlugin(plugin);
    if(i) isInstalled = true;
  }

  function Activate() {
    if (plugin.type === "theme") {
      applyThemeCSS(plugin);
    }else if(plugin.type === "plugin"){
        executePluginScript(plugin);
    }
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
    <div class="row">
      <img class="circle large" src={plugin.image} alt={plugin.name} />
      <div class="max">
        <h5>{plugin.name}</h5>
        <p>{plugin.description}</p>
      </div>
    </div>
    <div class="small-margin">
      {#if !isInstalled}
        <button class="primary" on:click={Install}>install {plugin.type}</button
        >
      {:else}
        <!-- apply theme CSS -->
    <button class="tertiary" on:click={Activate}
          >{plugin.type === "theme" ? "apply" : "activate"}
          {plugin.type}</button
        >
      {/if}
        </div>
  </article>
{/if}
