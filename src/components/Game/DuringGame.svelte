<script lang="ts">
  import Guessmap from './Guessmap.svelte';
  import Streetview from './Streetview.svelte';
  import Timer from './Timer.svelte'
  import { panorama, answer } from '../../store.js'
  
  export let numPlayers: number;
  export let room_id: string;
  const returnToTheStart = () => {
    $panorama.setPosition($answer)
  }

</script>

<div class="streetview"><Streetview></Streetview></div>
<div><Guessmap {room_id}></Guessmap></div>
<Timer {room_id} {numPlayers}></Timer>
<button class="returnButton" on:click={returnToTheStart}>Return to the Start</button>

<style>
  .streetview {
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 0;
  }
  button {
    z-index: 1;
    background-color: whitesmoke;
    border: none;
    color: black;
    padding: 5px 10px;
    margin: 0.5em;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 5px;
  }
  button:hover {
    background: lightcyan;
  }
  button:active {
    background: grey;
  }
  .returnButton {
    margin-top: -3em;
  }
</style>