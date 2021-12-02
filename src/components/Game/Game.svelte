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
</script>

<!-- 
<div class="streetview"><Streetview /></div>
<div class="guessmap"><Guessmap /></div> -->
<BeforeGame {room_id} />

<!-- <DuringGame {room_id} />
<AfterSubmit {room_id} />
<AfterGame {room_id} /> -->
<style>
  .streetview {
    position: absolute;
    top: 0px;
    left: 0px;
  }
</style>
