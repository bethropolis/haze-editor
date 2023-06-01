<script>
  export let msg = "";
  export let name = "";
  export let action = null;
  const ErrorElement = document.querySelector(".err");

  export const showError = async () => {
    if (!ErrorElement) return
    await ErrorElement.classList.add("active");
    setTimeout(() => {
    }, 2000);
  };

  function close() {
      ErrorElement.classList.remove("active");
  }
  $: name && console.log(name)
</script>

<dialog class="err bottom">
   <h5>{name}</h5>
  <div>{msg}</div>
  <nav class="right-align">
    <button class="border">Cancel</button>
    <button class="error"  on:click={close}>Confirm</button>
  </nav>
</dialog>

<style>
</style>
