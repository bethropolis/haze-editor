<script>
    import TodoBody from './ui/todoBody.svelte';
    import TodoSidebar from './ui/todoSidebar.svelte';
  import Widget from './ui/widget.svelte';
  </script>
  
  <div class="s3 large-height l m">
    <TodoSidebar/>
  </div>
  <div class="grid no-margin m8 l7 s12">
     <TodoBody/>
  </div>
  <div class="s2 fill m l">
    <Widget/>
  </div>
  
  <style>
    div {
      height: 100vh;
    }
  </style>
  