<script lang="ts">
  import logo from "./assets/svelte.png";
  import Map from "./Map.svelte";
  import StreetView from "./StreetView.svelte";
  import { Loader } from "@googlemaps/js-api-loader";
  import { onMount, setContext, getContext } from "svelte";
</script>

<div class="streetview"><StreetView></StreetView></div>
<div class="guessmap"><Map></Map></div>

<style>
  .streetview {
    position: absolute;
    top: 0px;
    left: 0px;
  }
</style>
