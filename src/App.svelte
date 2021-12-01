<script lang="ts">
  import { Loader } from "@googlemaps/js-api-loader";
  import { setContext } from "svelte";
  import Lobby from "./Lobby.svelte";
  const loader = new Loader({
    // Don't use this api key below unless you need it
    // apiKey: import.meta.env.VITE_MAPS_JS_API as string,
    apiKey: "",
  });
  console.log("main loader", loader);
  setContext("loader", loader);
</script>

<Lobby></Lobby>

<style></style>