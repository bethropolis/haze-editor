<script>
    import { onMount } from 'svelte';
    import { db } from '../../db';
    import { customEventStore } from '../../store';
  
    let searchQuery = '';
    let libs = [];
    let addedLibs = [];
  
    const libAdd = function (lib) {
        let type = lib.filename.split('.').pop();
      // @ts-ignore
      db.libs.add({
        name: lib.name,
        file: lib.latest,
        type,
      });
      $customEventStore = { name: 'add-lib', data: true };
      addedLibs.push(lib);
    }
  
    async function searchLibraries() {
      const response = await fetch(`https://api.cdnjs.com/libraries?search=${searchQuery}&fields=filename,github&limit=10&search_fields=name`);
      const data = await response.json();
      libs = data.results;
    }
  
    async function handleSearchInput() {
      await searchLibraries();
    }
  </script>
  
  <main>
    <nav class="small-padding">
      <h5 class="max small">Libraries</h5>
    </nav>
    <div class="field large prefix round fill">
      <i class="front">search</i>
      <input placeholder="Search text" bind:value={searchQuery} on:input={handleSearchInput} />
    </div>
    <hr />
    <div class="libs margin">
      {#each libs as lib}
      <article class="lib small-padding ">
        <nav>
          <h4>{lib.name}</h4>
          <div class="max" />
          <a href="#" class="stars center-align">
            <i>star</i>
            <span>{lib.github?.stargazers_count}</span>
          </a>
          <a href="https://github.com/{lib.github?.user}/{lib.github?.repo}" target="_blank" class="github">
            <i>home</i>
          </a>
          <a class="large-text" on:click={() => libAdd(lib)}>
             {#if addedLibs && addedLibs.includes(lib)}
              <i>check</i>
             {:else}
            <i>add</i>
             {/if}
          </a>
        </nav>
      </article>
      {/each}
    </div>
    <hr />
    <!-- powered by cdnjs -->
    <p>search powered by <span class="orange-text medium-text">cdn</span>js</p>
  </main>
  
  <style>
    .libs::-webkit-scrollbar {
    width: 0.1em;
  }
  .libs{
    overflow-y: scroll;
    height: 70dvh;
  }

  .libs::-webkit-scrollbar-thumb {
    background-color: var(--secondary-container);
    border-radius: 1px;
  }

  .libs::-webkit-scrollbar-track {
    background-color: var(--background);
  }
    h4{
      margin: 0;
      padding: 0;
      width: 250px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  </style>
  