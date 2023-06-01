<script>
  export let msg = "";
  export let aName = "";
  export let action = null;

  export const showToast = () => {
    const toastElement = document.querySelector(".toast");
    toastElement.classList.add("active");
    setTimeout(() => {
      toastElement.classList.remove("active");
    }, 2000);
  };

</script>

<div class="toast">
  <div class="max">{msg}</div>
  <a class="inverse-link" on:click={action}>{aName}</a>
</div>
