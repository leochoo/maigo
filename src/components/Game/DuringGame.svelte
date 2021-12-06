<script lang="ts">
  import Guessmap from '../Guessmap.svelte';
  import Streetview from '../Streetview.svelte';
  export let room_id: string;
</script>

<div class="streetview"><Streetview></Streetview></div>
<div><Guessmap></Guessmap></div>

<style>
  .streetview {
    position: absolute;
    top: 0px;
    left: 0px;
  }
</style>