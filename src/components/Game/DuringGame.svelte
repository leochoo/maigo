<script lang="ts">
  import Guessmap from './Guessmap.svelte';
  import Streetview from './Streetview.svelte';
  import Timer from './Timer.svelte'

  export let room_id: string;
</script>

<div class="streetview"><Streetview></Streetview></div>
<div><Guessmap {room_id}></Guessmap></div>
<Timer {room_id}></Timer>
<button>Return to the Start</button>

<style>
  .streetview {
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 0;
  }

  button {
    z-index: 1;
  }
</style>