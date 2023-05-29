<script>
  import { code, customEventStore } from "./../store.js";
  import { createTemplate } from "./../js/template";

  let viewer;
  let updateView = function () {
    const combinedCode = createTemplate($code.html, $code.css, $code.js);
    viewer.srcdoc = combinedCode;
  };
  $: if ($code && $code.html) updateView();

  $: $customEventStore.name == "update_code" && updateView();
</script>

<iframe bind:this={viewer} />

<style>
  iframe {
    border: 1px solid #ccc;
    box-shadow: 0 0 5px #ccc;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background-color: white;
  }
</style>
