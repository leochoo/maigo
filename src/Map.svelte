<script lang="ts">
  import { getContext, onMount } from "svelte";
  import type { Loader } from "@googlemaps/js-api-loader";

  let container;
  let zoom = 12;
  let center = { lat: 35.3875841547467, lng: 139.4268758324958 };
  let marker: google.maps.Marker;

  const loader: Loader = getContext("loader");
  
  function initMap(): void {
    const myLatLng = { lat: -25.363, lng: 131.044 };
    const map = new google.maps.Map(container, {
        zoom,
        center,
        disableDefaultUI: true,
        zoomControl: true,
    });
    google.maps.event.addListener(map, "click", (event) => {
      addMarker(event.latLng, map);
    });
  }

  function addMarker(location: google.maps.LatLngLiteral, map: google.maps.Map) {
    if (marker != null) {
      marker.setPosition(location);
    }
    else {
      marker = new google.maps.Marker({
        position: location,
        map: map,
      });
    }
  };

  onMount(() => {
    loader.load().then(()=> {
      initMap();
    });
  });
</script>

<div class="map2d-comp" bind:this={container} />

<style>
  .map2d-comp {
    width: 70vw;
    height: 30vh;
  }
</style>
