<script lang="ts">
  import Guessmap from '../Guessmap.svelte';
  import Streetview from '../Streetview.svelte';
  import Timer from '../Game/Timer.svelte'
  import { getContext, onDestroy } from 'svelte';
  import { onSnapshot, doc } from 'firebase/firestore';
  import { db } from "../../../firebase";

  export let room_id: string;
</script>

<div class="streetview"><Streetview></Streetview></div>
<div><Guessmap {room_id}></Guessmap></div>
<Timer {room_id}></Timer>

<style>
  .streetview {
    position: absolute;
    top: 0px;
    left: 0px;
  }
</style>