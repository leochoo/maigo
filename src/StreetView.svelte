<script lang="ts">
  import { getContext, onMount } from "svelte";
  import type { Loader } from "@googlemaps/js-api-loader";

  let container;
  let streetViewMap;
  let zoom = 12;
  let center = { lat: 35.3875841547467, lng: 139.4268758324958 };
  const loader: Loader = getContext("loader");
  loader.load().then(() => {
    streetViewMap = new google.maps.StreetViewPanorama(container, {
      zoom,
      position: center,
      disableDefaultUI: true,
    });
  });
</script>

<div class="streetview-comp" bind:this={container} />

<style>
  .streetview-comp {
    width: 100vw;
    height: 60vh;
  }
</style>
