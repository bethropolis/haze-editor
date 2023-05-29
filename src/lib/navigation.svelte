<script>
  import { active,navItems} from "../store";
  export let activeItem = $active;
</script>

<nav class="m l left">
  {#each $navItems as item}
<a class:active={activeItem === item.label} on:click={() => activeItem = item.label} href="#">
      <i>{item.icon}</i>
      <span>{item.label}</span>
    </a>
  {/each}
</nav>

