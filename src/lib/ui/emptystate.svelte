<script>
  import { createEventDispatcher, onMount  } from "svelte";
  import { nav } from "../../js/editor";
  const dispatch = createEventDispatcher();

  export let no = 0;

  let emptyTexts = [
    {
      icon: "code",
      title: "You have no commits",
      message:
        "Start coding to track your progress. Simply write, save, and commit.",
      button: "Write code",
      action: function () {
        nav("code");
      },
    },
    {
      icon: "commit",
      title: "Select a commit",
      message:
        "Alright, let's get nostalgic. Select a commit in the sidebar to see just how far you've come.",
      button: "Select latest",
      action: function () {
        dispatch("commit", 'latest');
      },
    },
  ];

  let values = {};

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
      <button on:click={values.action}>{values.button}</button>
    </nav>
  </div>
</div>
