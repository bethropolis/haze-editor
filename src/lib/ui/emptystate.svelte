<script>
	import { settings } from './../../store.js';
  import { createEventDispatcher, onMount  } from "svelte";
  import { nav } from "../../js/editor";
  import { viewActive } from "../../store";
  import { DB } from '../../db/db.js';
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
      }
    },
      {
        icon: "terminal",
        title: "Console not available",
        message: 
          "This feature is not available yet.",
        button: "back to view",
        action: function () {
          $viewActive = "view";
        }
      },
      {
        icon: "edit",
        title: "Theme Editor",
        message: "Theme Editor has been activated.",
        button: "turn off",
        action: function () {
          $settings.ThemeEditMode.value = false;
          DB.set("settings", $settings);
        }
      }
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
