<script>
  // @ts-nocheck

  import { DB } from "../../db/db";
  import { settings } from "../../store";
  import About from "./about.svelte";

  $: if ($settings) {
    DB.set("settings", $settings);
  }
</script>

<main class="s12 l6 m12">
  <nav class="padding">
    <h5 class="max">Settings</h5>
  </nav>
  {#each Object.entries($settings) as [key, setting]}
    {#if setting.type === "switch"}
      <div class="field middle-align margin">
        <nav>
          <div class="max">
            <h6>{setting.title}</h6>
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
            <h6>{setting.title}</h6>
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
            <h6>{setting.title}</h6>
            <div>{setting.label}</div>
          </div>
          <button
            on:click={() => (setting.value = !setting.value)}
            class="tertiary">{setting.short}</button
          >
        </nav>
      </div>
    {/if}
    <!-- if text put  -->
    
  {/each}
</main>
<div class="s6 l m about">
   <About/>
</div>
<style>
  main, .about {
    height: 100dvh;
    overflow: auto;
  }
  textarea,input {
    width: 90%;
    margin: 0 2em;
  }
  main > div {
    margin-top: 2em !important;
  }
  
  main::-webkit-scrollbar {
    width: 7px;
  }

  main::-webkit-scrollbar-thumb {
    background-color: var(--primary);
    border-radius: 1px;
  }

  main::-webkit-scrollbar-track {
    background-color: var(--background);
  }
</style>
