<script>
import { code, customEventStore } from "./../store.js";
import { createTemplate } from "./../js/template";

let viewer = null;

function updateView() {
  try {
    const combinedCode = createTemplate($code.html, $code.css, $code.js);
    viewer.srcdoc = combinedCode || "Error: no combined code available";
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

$: if ($code && $code.html && viewer) updateView();

$: if ($customEventStore?.name === "update_code") {
  try {
    updateView();
  } catch (error) {
    console.error(error);
  }
}

</script>

<iframe title="viewer" bind:this={viewer} />

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
