<script lang="ts">
  import Guessmap from "../Guessmap.svelte";
  import Streetview from "../Streetview.svelte";
  import { Loader } from "@googlemaps/js-api-loader";
  import { onMount, setContext, getContext } from "svelte";
</script>

<div class="streetview"><Streetview /></div>
<div class="guessmap"><Guessmap /></div>

<style>
  .streetview {
    position: absolute;
    top: 0px;
    left: 0px;
  }
</style>
