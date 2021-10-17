<script lang="ts">
  export let loader: any;
  import { onMount } from "svelte";

  let container;
  let map;
  let zoom = 12;
  let center = { lat: 35.386331788, lng: 139.423664972 };

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
