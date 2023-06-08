<script>
  export let message = "Are you sure?";
  export let hidden = true;
  let accept = false;

  export const show = async () => {
    hidden = false;

    return new Promise((resolve, reject) => {
      // Perform some asynchronous operation
      setTimeout(() => {
        if (accept) {
          resolve(true);
        } else {
          resolve(false);
        }
        hide()
      }, 4000);
    });
  };

  export const hide = () => {
    hidden = true;
  };

  const cancel = () => {
    hide();
  };

  function callAction() {
    accept = true;
    hide();
  }
</script>

<article class="no-padding no-margin no-round" style:display={hidden ? "none" : "block"}>
  <div class="large-padding absolute center middle modal background round">
    <h5>Confirm</h5>
    <div>{message}</div>
    <nav class="right-align">
      <button class="border" on:click={() => cancel()}>Cancel</button>
      <button on:click={callAction}>Confirm</button>
    </nav>
  </div>
</article>

<style>
  article {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100;
  }
</style>
