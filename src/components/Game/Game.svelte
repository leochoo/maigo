<script lang="ts">
  import Guessmap from "../Guessmap.svelte";
  import Streetview from "../Streetview.svelte";
  import { Loader } from "@googlemaps/js-api-loader";
  import { onMount, setContext, getContext } from "svelte";
  import BeforeGame from "./beforeGame.svelte";
  import DuringGame from "./duringGame.svelte";
  import AfterSubmit from "./AfterSubmit.svelte";
  import AfterGame from "./AfterGame.svelte";

  export let room_id: string;
  let _phase: number = 0;

  function phaseChange() {
    _phase++;
  }

  setContext('phaseChange', phaseChange);
</script>

<!-- 
<div class="streetview"><Streetview /></div>
<div class="guessmap"><Guessmap /></div> -->
{#if _phase == 0}
  <BeforeGame {room_id} />
{:else if _phase == 1}
  <DuringGame {room_id} />
{/if}
<!-- <AfterSubmit {room_id} />
<AfterGame {room_id} /> -->
<style>
</style>
