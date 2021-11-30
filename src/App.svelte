<script lang="ts">
  import logo from "./assets/svelte.png";
  import Map from "./Map.svelte";
  import StreetView from "./StreetView.svelte";
  import { Loader } from "@googlemaps/js-api-loader";
  import { onMount, setContext, getContext } from "svelte";
  import Lobby from "./Lobby.svelte";
  import Game from "./game.svelte";
  const loader = new Loader({
    // Don't use this api key below unless you need it
    // apiKey: import.meta.env.VITE_MAPS_JS_API as string,
    apiKey: "",
  });
  console.log("main loader", loader);
  setContext("loader", loader);
</script>
<!-- <Lobby></Lobby> -->
<Game></Game>

<style></style>