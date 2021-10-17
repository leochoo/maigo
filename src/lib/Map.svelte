<script lang="ts">
  import { onMount } from "svelte";
  import { Loader } from "@googlemaps/js-api-loader";

  let container;
  let map;
  let zoom = 8;
  let center = { lat: -34.397, lng: 150.644 };

  onMount(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_MAPS_JS_API as string,
    });
    // console.log("loader", loader);
    loader.load().then(() => {
      map = new google.maps.Map(container, {
        zoom,
        center,
        disableDefaultUI: true,
      });
    });
  });
</script>

<div class="full-screen" bind:this={container} />

<style>
  .full-screen {
    width: 60vw;
    height: 60vh;
  }
</style>
