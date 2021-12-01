<script lang="ts">
  import logo from "./assets/svelte.png";
  import Guessmap from "./Guessmap.svelte";
  import Streetview from "./Streetview.svelte";
  import { Loader } from "@googlemaps/js-api-loader";
  import { onMount, setContext, getContext } from "svelte";
</script>

<div class="streetview"><Streetview></Streetview></div>
<div class="guessmap"><Guessmap></Guessmap></div>

<style>
  .streetview {
    position: absolute;
    top: 0px;
    left: 0px;
  }
</style>
