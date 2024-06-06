<script>
  import { pluginUrl } from "./../store.js";
  import { DB } from "../db/db.js";
  import { Err, Success } from "../js/toast";
  import Sideoptions from "./Sideoptions.svelte";
  import Plugin from "./ui/plugin.svelte";

  let plugins = []; // Initially, no plugins
  let backup = [];
  let no = 0;
  let isLoading = false;
  let choosen = DB.get("activeTheme");


  // Fetch plugins from the JSON file
  async function fetchPlugins() {
    try {
      isLoading = true;
      const response = await fetch($pluginUrl);
      plugins = await response.json();
      const custom = (await DB.get("customPlugin")) || null;
      plugins = custom ? [...plugins, custom] : plugins;
      backup = plugins;
      isLoading = false;
    } catch (error) {
      isLoading = false;
      Err("Error fetching plugins:");
    }
  }

  // Filter plugins based on type
  function filter(type = "plugin") {
    plugins = backup.filter((plugin) => plugin.type === type);
    no = type === "plugin" ? 0 : 1;
  }

  // Upload function to add custom plugin
  async function upload(event) {
    try {
      const file = event.target.files[0];
      const fileReader = new FileReader();

      // Read file contents
      fileReader.onload = async (e) => {
        try {
          const pluginData = JSON.parse(String(e.target.result));
          // Assuming the JSON file contains a single plugin object
          if (typeof pluginData === "object" && pluginData.name) {
            plugins = [...plugins, { ...pluginData, dev: true }];
            Success("Plugin uploaded successfully!");
            DB.set("customPlugin", { ...pluginData, dev: true });
          } else {
            Err("Invalid plugin file. Please upload a valid JSON file with plugin object.");
          }
        } catch (error) {
          Err("Error reading plugin file. Please upload a valid JSON file.");
        }
      };

      // Read the file as text
      fileReader.readAsText(file);
    } catch (error) {
      Err("Error uploading plugin:");
    }
  }


  // Call the fetchPlugins function to get the plugin data
  fetchPlugins();
</script>
<div class="s12">
  <header>
    <nav>
      <h5 class="max">Plugins & Themes</h5>
      <div>
        <div class="tabs left-align min">
          <a on:click={() => filter("plugin")} class:active={no === 0}
            >plugins</a
          >
          <a on:click={() => filter("theme")} class:active={no === 1}>theme</a>
        </div>
      </div>
      <Sideoptions>
        <label for="file" class="button transparent circle">
          <input
            type="file"
            name="file"
            id="file"
            hidden
            on:change={upload}
            accept=".json"
          />
          <i>upload</i>
            <div class="tooltip max left vertical">
              <b>Load plugin/theme</b>
              <p class="wrap">This allows developers to upload and test their plugins and themes during development.</p>
              <nav>
                <a class="inverse-link" href="https://github.com/bethropolis/haze-editor/#plugins" target="_blank">Help</a>
              </nav>
            </div>
        </label>
      </Sideoptions>
    </nav>
  </header>
  <div class="grid responsive">
    {#if plugins.length > 0}
      {#each plugins as plugin}
        <Plugin {plugin} bind:choosen />
      {/each}
    {:else}
      <div class="s12 medium no-padding middle-align center-align large-height vertical">
        {#if isLoading}
          <a class="loader medium" />
          <p>Please wait getting plugins</p>
        {:else}
          <h5 class="center-align">No plugins found.</h5>
        <a href="https://github.com/bethropolis/haze-editor/#plugins" target="_blank" class="primary-text"><p>Learn more</p></a>
        {/if}
      </div>
    {/if}
  </div>
</div>

<style>
 .tooltip{
  margin-top: 5em !important;
 }
</style>
