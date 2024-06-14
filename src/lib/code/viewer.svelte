<script>
  import { code, customEventStore } from "../../store.js";
  import { createTemplate } from "../../js/template.js";
  import { onMount } from "svelte";
  import "../../js/console.js";

  let viewer = null;
  let combinedCode = null;

  async function updateView() {
    try {
      const combinedCode = await createTemplate(
        $code.html,
        $code.css,
        $code.js
      );
      viewer.srcdoc = combinedCode || "";
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }

  onMount(async () => {
    try {
      combinedCode = await createTemplate($code.html, $code.css, $code.js);
      viewer.srcdoc = combinedCode || "";
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  });

  $: if ($code && $code.html) {
    const newCode = JSON.stringify([$code.html, $code.css, $code.js]);
    if (newCode !== combinedCode) {
      combinedCode = newCode;
      updateView();
    }
  }

  $: if ($customEventStore?.name === "update_code") {
    const newCode = JSON.stringify([$code.html, $code.css, $code.js]);
    if (newCode !== combinedCode) {
      combinedCode = newCode;
      updateView();
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
    height: calc(100dvh - 50px);
    background-color: white;
  }
</style>
