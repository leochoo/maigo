<script lang="ts">
  import { getContext, onMount } from "svelte";
  import type { Loader } from "@googlemaps/js-api-loader";

  let container;
  let map;
  let zoom = 12;
  let center = { lat: 35.3875841547467, lng: 139.4268758324958 };

  const loader: Loader = getContext("loader");
  loader.load().then(() => {
    map = new google.maps.Map(container, {
      zoom,
      center,
      disableDefaultUI: true,
      zoomControl: true,
    });
  });

  onMount(() => {
    // console.log("loader", loader);
  });
</script>

<div class="map2d-comp" bind:this={container} />

<style>
  .map2d-comp {
    width: 70vw;
    height: 30vh;
  }
</style>
