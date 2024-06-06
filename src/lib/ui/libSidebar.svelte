<script>
  import { onMount } from "svelte";
  import { db } from "../../db/db";
  import { customEventStore } from "../../store";
  import { Err, Success } from "../../js/toast";
import { cacheFile } from "../../js/cache";

  let searchQuery = "";
  let libs = [];
  let addedLibs = [];
  let isLoading = false;

  const libAdd = async function (lib) {
    let type = lib.filename.split(".").pop();
    // @ts-ignore
    await db.libs.add({
      name: lib.name,
      file: lib.latest,
      type,
      active: true,
    });
    $customEventStore = { name: "add-lib", data: true };
    lib.active = true;
    await cacheFile(lib.latest);
  };

  async function searchLibraries() {
    isLoading = true;
    try {
      const response = await fetch(
        `https://api.cdnjs.com/libraries?search=${searchQuery}&fields=filename,github&limit=10&search_fields=name`
      );
      const data = await response.json();
      libs = data.results;
      isLoading = false;
    } catch (err) {
      Err("Failed to fetch Libraries");
      isLoading = false;
    }
  }

  //  a func to clear all libraries from the db
  async function clearLibraries() {
    // @ts-ignore
    await db.libs.clear();
    $customEventStore = { name: "add-lib", data: true };
    libs = [];
  }

  async function handleSearchInput() {
    await searchLibraries();
  }

  async function clearCache() {
  const cacheName = "libs-cache";
  const result = await caches.delete(cacheName);
  Success(`Cache ${cacheName} deleted: ${result}`);
}


  onMount(async () => {
    searchLibraries();
  });
</script>

<main>
  <nav class="small-padding">
    <h5 class="max small">Libraries</h5>
    <a href="#"
      ><i>more_vert</i>
      <menu class="right no-wrap">
        <a href="#" on:click={clearLibraries}> Clear all</a>
        <a href="#" on:click={clearCache}> Clear cache</a>
      </menu>
    </a>
  </nav>
  <div class="field large prefix round fill">
    <i class="front">search</i>
    <input
      placeholder="Search Libraries"
      bind:value={searchQuery}
      on:input={handleSearchInput}
    />
    {#if isLoading}
      <a class="loader" />
    {/if}
  </div>
  <hr />
  <div class="libs margin">
    {#each libs as lib}
      <article class="lib small-padding">
        <nav>
          <h4>{lib.name}</h4>
          {#if lib.active}
            <span class="orange-text">added</span>
          {/if}
          <div class="max" />
          <a href="#" class="stars center-align">
            <i>star</i>
            <span>{lib.github?.stargazers_count}</span>
          </a>
          <a
            href="https://github.com/{lib.github?.user}/{lib.github?.repo}"
            target="_blank"
            class="github"
          >
            <i>home</i>
          </a>
          <a class="large-text" on:click={() => libAdd(lib)}>
            <i>add</i>
          </a>
        </nav>
      </article>
    {/each}
  </div>
  <hr />
  <!-- powered by cdnjs -->
  <div class="horizontal small-margin">
    <p>search powered by <span class="orange-text medium-text">cdn</span>js</p>
  </div>
</main>

<style>
  .libs::-webkit-scrollbar {
    width: 0.1em;
  }
  .libs {
    overflow-y: scroll;
    height: 70dvh;
    padding-right: 0.5em;
  }

  .libs::-webkit-scrollbar-thumb {
    background-color: var(--secondary-container);
    border-radius: 1px;
  }

  .libs::-webkit-scrollbar-track {
    background-color: var(--background);
  }
  h4 {
    margin: 0;
    padding: 0;
    width: 237px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
