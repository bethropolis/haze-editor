<script>
  import { Err} from "../js/toast";
  import Sideoptions from "./Sideoptions.svelte";
  import Plugin from "./ui/plugin.svelte";

  let plugins = []; // Initially, no plugins
  let backup = [];
  let no = 0;
  // Fetch plugins from the JSON file
  async function fetchPlugins() {
    try {
      const response = await fetch("http://localhost/plugins/");
      plugins = await response.json();
      backup = plugins;
    } catch (error) {
      Err("Error fetching plugins:")
    }
  }

  function filter(type = "plugin") {
    plugins = backup;
    plugins = plugins.filter((plugin) => plugin.type === type);
    if(type === "plugin") no = 0;
    if(type === "theme") no = 1;
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
      <Sideoptions />
    </nav>
  </header>
  <div class="grid">
    {#each plugins as plugin}
      <Plugin {plugin} />
    {/each}
  </div>
</div>

<style>
</style>
