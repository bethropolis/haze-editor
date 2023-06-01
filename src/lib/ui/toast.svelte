<script>
  export let msg = "";
  export let aName = "";
  export let type = "";
  export let action = null;

  export const showToast = () => {
    const toastElement = document.querySelector(".toast");
    toastElement.classList.add("active");
  };
</script>

<div class="toast {type}">
  <div class="max">{msg}</div>
  {#if aName}
    <a class="inverse-link" on:click={action}>{aName}</a>
  {/if}
</div>
