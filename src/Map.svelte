<script lang="ts">
  import { getContext, onMount } from "svelte";
  import type { Loader } from "@googlemaps/js-api-loader";
  import { answer } from "./store";

  let container;
  let zoom = 12;
  let center = { lat: 35.3875841547467, lng: 139.4268758324958 };
  let marker: google.maps.Marker;
  let submit;
  $: _answer = $answer;
  $: if (marker) {
    submit = { lat: marker.getPosition().lat(), lng: marker.getPosition().lng()};
  }
  const loader: Loader = getContext("loader");
  function initMap(): void {
    const myLatLng = { lat: -25.363, lng: 131.044 };
    const map = new google.maps.Map(container, {
        zoom,
        center,
        disableDefaultUI: true,
        zoomControl: true,
        clickableIcons: false,
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

  function calcDistance(): void {
    let ans_latlng = new google.maps.LatLng(Number(_answer.lat), Number(_answer.lng));
    let distance = google.maps.geometry.spherical.computeDistanceBetween( ans_latlng , marker.getPosition() );
    console.log(Math.floor(distance),'Meter(s)');
  }

  onMount(() => {
    loader.load().then(()=> {
      initMap();
    });
  });
</script>

<div class="map2d-comp" bind:this={container} />

<button on:click={() => {
  if (marker != null) {
    calcDistance();
  }
  else {
    console.log("no marker");
  }
}}>submit</button>
<style>
  .map2d-comp {
    width: 70vw;
    height: 30vh;
  }
</style>
