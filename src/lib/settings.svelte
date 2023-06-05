<script>
  // @ts-nocheck

  import { DB } from "../db";
  import { settings } from "../store";
  import About from "./ui/about.svelte";

  $: if ($settings) {
    DB.set("settings", $settings);
  }
</script>

<main class="s6">
  <nav class="padding">
    <h5 class="max">Settings</h5>
  </nav>
  {#each Object.entries($settings) as [key, setting]}
    {#if setting.type === "switch"}
      <div class="field middle-align margin">
        <nav>
          <div class="max">
            <h6>{key}</h6>
            <div>{setting.label}</div>
          </div>
          <label class="switch">
            <input
              type="checkbox"
              on:change={() => (setting.value = !setting.value)}
              checked={setting.value || false}
            />
            <span />
          </label>
        </nav>
      </div>
    {/if}
    {#if setting.type === "textarea"}
      <div class="field middle-align margin">
        <nav>
          <div class="max">
            <h6>{key}</h6>
            <div>{setting.label}</div>
          </div>
        </nav>
      </div>
      <div class="field textarea border extra">
        <textarea
          placeholder={setting.placeholder}
          bind:value={setting.value}
        />
      </div>
    {/if}
    {#if setting.type === "button"}
      <div class="field middle-align margin">
        <nav>
          <div class="max">
            <h6>{key}</h6>
            <div>{setting.label}</div>
          </div>
          <button
            on:click={() => (setting.value = !setting.value)}
            class="tertiary">{setting.short}</button
          >
        </nav>
      </div>
    {/if}
  {/each}
</main>
<div class="s6 about">
   <About/>
</div>
<style>
  main, .about {
    height: 100dvh;
    overflow: auto;
  }
  textarea {
    width: 90%;
    margin: 0 2em;
  }
  main > div {
    margin-top: 2em !important;
  }
</style>
