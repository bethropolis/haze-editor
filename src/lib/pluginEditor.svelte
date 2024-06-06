<script>
	import { settings } from './../store.js';
  import {  customEventStore } from "../store.js";
  import CodeMirror from "svelte-codemirror-editor";
  import { css } from "@codemirror/lang-css";
  import { onMount, onDestroy } from "svelte";
  import { DB } from "../db/db.js";

  let value = "";
  let language = css();

  const updateValue = function (l = null) {
    DB.set("css-theme", value);
    appendStyle();
  };

  onMount(() => updateValue);

  // Subscribe to the custom event store
  const unsubscribe = customEventStore.subscribe((event) => {
    if (event.name == "update_code") {
      updateValue();
    }
  });

  onMount(()=>{
    value = DB.get("css-theme");
  })

  // function append style to heaad
  function appendStyle() {
    if(!$settings.ThemeEditMode.value) return
    const s = document.querySelector("style[data-type='theme']");
    if (s) {
      document.head.removeChild(s);
    }
    let style = document.createElement("style");
    style.innerHTML = `${value}`;
    style.setAttribute("data-type", "theme");
    document.head.appendChild(style);
  }

  // Unsubscribe from the custom event store when the component is destroyed
  onDestroy(unsubscribe);
</script>

<CodeMirror
  bind:value
  lang={language}
  on:change={updateValue}
  styles={{
    "&": {
      width: "100%",
      maxWidth: "100%",
      height: "100dvh",
    },
  }}
/>
