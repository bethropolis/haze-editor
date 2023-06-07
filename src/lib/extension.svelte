<script>
  import { DB } from "../db";
  import { Err, Success } from "../js/toast";
  import Sideoptions from "./Sideoptions.svelte";
  import Plugin from "./ui/plugin.svelte";

  let plugins = []; // Initially, no plugins
  let backup = [];
  let no = 0;
  
  // Fetch plugins from the JSON file
  async function fetchPlugins() {
    try {
      const response = await fetch("");
      plugins = await response.json();
      const custom = await DB.get("customPlugin")|| null;
      plugins = custom ? [...plugins, custom] : plugins;
      backup = plugins;
    } catch (error) {
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
          if (typeof pluginData === "object") {
            plugins = [...plugins, {...pluginData, dev: true}];  
            Success("Plugin uploaded successfully!");
            DB.set("customPlugin", {...pluginData, dev: true});
          } else {
            Err("Invalid plugin file. Please upload a valid JSON file.");
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
          <a on:click={() => filter("plugin")} class:active={no === 0}>plugins</a>
          <a on:click={() => filter("theme")} class:active={no === 1}>theme</a>
        </div>
      </div>
      <Sideoptions>
        <label for="file" class="button transparent circle">
          <input type="file" name="file" id="file" hidden on:change={upload} accept=".json" />
          <i>upload</i>
        </label>
      </Sideoptions>
    </nav>
  </header>
  <div class="grid">
    {#each plugins as plugin}
    <Plugin {plugin} />
    {/each}
  </div>
</div>

<style>
  /* Add your custom styles here */
</style>
