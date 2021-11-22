<script lang="ts">
  import logo from "./assets/svelte.png";
  import Map from "./Map.svelte";
  import StreetView from "./StreetView.svelte";
  import { Loader } from "@googlemaps/js-api-loader";
  import { onMount, setContext, getContext } from "svelte";
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
  <!-- <div class="streetview"><StreetView /></div>
  <div class="map2d"><Map /></div> -->

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  .map2d {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
  }

  main {
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  img {
    height: 16rem;
    width: 16rem;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 14rem;
  }

  p {
    max-width: 14rem;
    margin: 1rem auto;
    line-height: 1.35;
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }

    p {
      max-width: none;
    }
  }
</style>
