<script>
  import { code, customEventStore } from "./../store.js";
  import CodeMirror from "svelte-codemirror-editor";
  import { javascript } from "@codemirror/lang-javascript";
  import { html } from "@codemirror/lang-html";
  import { css } from "@codemirror/lang-css";
  import { lang } from "../store";
  import { onMount, onDestroy } from "svelte";

  let value = "";
  let language;
  $: if ($lang) {
    switch ($lang) {
      case "js":
        language = javascript();
        break;
      case "css":
        language = css();
        break;
      default:
        language = html();
        break;
    }
    updateValue()
  }

  const updateCode = function () {
    $code[$lang] = value;
  };

  const updateValue = function (l = null) {
    value = l ? $code[l] : $code[$lang];
  };

  onMount(() =>updateValue);

  // Subscribe to the custom event store
  const unsubscribe = customEventStore.subscribe((event) => {
    if (event.name == "update_code") {
      updateValue();     
    }
  });

  // Unsubscribe from the custom event store when the component is destroyed
  onDestroy(unsubscribe);

  $: value && updateCode();
</script>

<CodeMirror
  bind:value
  lang={language}
  styles={{
    "&": {
      width: "100%",
      maxWidth: "100%",
      height: "50rem",
    },
  }}
/>
