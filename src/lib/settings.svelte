<script>
  import { DB } from "../db";

let settings = {
  navLabels:{
    value: true,
    type: "switch",
    label: "Navigation Labels"
  },
}

$: if(settings){
    DB.set("settings", settings)
}
</script>

<main class="s6">
    <nav>
        <h5 class="max">Settings</h5>
    </nav>
    {#each Object.entries(settings) as [key, setting]}
     {#if setting.type === "switch"}
     <div class="field middle-align">
       <nav>
         <div class="max">
           <h6>{key}</h6>
           <div>{setting.label}</div>
         </div>
         <label class="switch">
           <input type="checkbox" on:change={() => setting.value = !setting.value} checked={setting.value}>
           <span></span>
         </label>
       </nav>
     </div>
     {/if}

     {#if setting.type === "text"}
     <div class="field middle-align">
       <nav>
         <div class="max">
           <h6>{key}</h6>
           <div>{setting.label}</div>
         </div>
         <input type="text" bind:value={setting.value}>
       </nav>
     </div>
     {/if}
    {/each}

</main>
<style>
   
</style>

