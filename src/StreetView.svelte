<script lang="ts">
  export let loader: any;
  import { onMount } from "svelte";

  let container;
  let streetViewMap;
  let zoom = 12;
  let center = { lat: 35.386331788, lng: 139.423664972 };

  onMount(() => {
    // console.log("loader2", loader2);
    loader.load().then(() => {
      streetViewMap = new google.maps.Map(container, {
        zoom,
        center,
        disableDefaultUI: true,
        zoomControl: true,
      });
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
