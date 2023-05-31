<script>
    import { nav } from "../../js/editor";
    import { onMount } from "svelte";
  
    export let no = 0;
  
    let emptyTexts = [
      {
        icon: "code",
        title: "You have no commits",
        message:
          "Start coding to track your progress. Simply write, save, and commit.",
        button: "Write code",
        to: "code",
      },
      {
      icon: "commit",
      title: "Select a commit",
      message: "Alright, let's get nostalgic. Select a commit in the sidebar to see just how far you've come.",
      button: "Write code",
      to: "code",
    }
    ];
  
    let values = {};
  
    function navigate() {
      nav(values.to);
    }
  
    onMount(() => {
      values = emptyTexts[no];
    });
  </script>
  
  <div class="large-height middle-align center-align">
    <div class="center-align">
      <i class="extra">{values.icon}</i>
      <h5 class="center-align">{values.title}</h5>
      <p>{values.message}</p>
      <div class="space" />
      <nav class="center-align">
        <button on:click={navigate}>{values.button}</button>
      </nav>
    </div>
  </div>
  