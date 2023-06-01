<script>
    import TodoBody from './ui/todoBody.svelte';
    import TodoSidebar from './ui/todoSidebar.svelte';
  import Widget from './ui/widget.svelte';
  </script>
  
  <div class="s3 large-height">
    <TodoSidebar/>
  </div>
  <div class="s7 grid no-margin">
     <TodoBody/>
  </div>
  <div class="s2 fill">
    <Widget/>
  </div>
  
  <style>
    div {
      height: 100vh;
    }
  </style>
  