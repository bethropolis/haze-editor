<script>
  import { exportCodeAsHtml, handleFileSelect } from "../../js/export";
  import { activeMobileCode, code } from "../../store";
  import { clearEditor, nav, setEvent } from "../../js/editor.js";
  import { save } from "../../js/save";

  const exportCode = async function () {
    await exportCodeAsHtml($code.html, $code.css, $code.js);
  };

  const importCode = async function (e) {
    let file = await handleFileSelect(e).then((res) => {
      $code.html = res.html;
      $code.css = res.css;
      $code.js = res.js;
    });
    await setEvent("update_code");
  };

  const editorClear = async function () {
    clearEditor();
    await setEvent("update_code");
  };
</script>

<main>

  <button class="circle transparent s" on:click={()=> $activeMobileCode = !$activeMobileCode} aria-label="Preview">
    <i>visibility</i>
    <div class="tooltip bottom">Preview</div>
  </button>
  <button class="circle transparent l m" on:click={()=> nav("changes")} aria-label="Commit">
    <i>commit</i>
    <div class="tooltip bottom">Commit changes</div>
  </button>


  <button class="circle transparent" on:click={save} aria-label="Save">
    <i>save</i>
    <div class="tooltip bottom">Save changes</div>
  </button>
  <button class="circle transparent">
    <i>more_vert</i>
    <menu class="left  no-wrap">
      <a href="#" on:click={editorClear}>Clear editor</a>
      <a href="#" on:click={exportCode}>export file</a>
      <a href="#"><label for="import"> import file</label></a>
    </menu>
  </button>
</main>
<input
  type="file"
  id="import"
  accept=".html"
  on:change={(e) => importCode(e)}
  hidden
/>

<style>
  /* your styles go here */
  main {
    z-index: 10;
  }
  label {
    font: inherit;
  }
</style>
