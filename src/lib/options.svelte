<script>
  import { customEventStore } from "./../store.js";
  import { exportCodeAsHtml, handleFileSelect } from "../js/export";
  import { code } from "../store";
  import { clearEditor } from "../js/editor.js";

  const exportCode = function () {
    exportCodeAsHtml($code.html, $code.css, $code.js);
  };

  const importCode = async function (e) {
    let file = await handleFileSelect(e).then((res) => {
      $code.html = res.html;
      $code.css = res.css;
      $code.js = res.js;
    });
    await setEvent("update_code");
  };

  const editorClear = async function(){
    clearEditor();
    await setEvent("update_code");
  }

  function setEvent(name) {
    const info = { name, data: null };
    $customEventStore = info;
  }



</script>

<!-- markup (zero or more items) goes here -->
<button class="circle transparent">
  <i>commit</i>
</button>
<button class="circle transparent">
  <i>save</i>
</button>
<button class="circle transparent">
  <i>more_vert</i>
  <menu class="right no-wrap">
    <a href="#" on:click={editorClear}>Clear editor</a>
    <a href="#" on:click={exportCode}>export file</a>
    <a href="#"><label for="import"> import file</label></a>
  </menu>
</button>

<input
  type="file"
  id="import"
  accept=".html"
  on:change={(e) => importCode(e)}
  hidden
/>

<style>
  /* your styles go here */
  label {
    font: inherit;
  }
</style>
