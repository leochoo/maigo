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

<div class="guessmap-comp" bind:this={container} />
<div class="submit">
  <button class="submit-button" on:click={() => {
    if (marker != null) {
      calcDistance();
    }
    else {
      console.log("no marker");
    }
  }}>submit</button>
</div>
<style>
  .guessmap-comp {
    width: 50vw;
    height: 50vh;
    z-index: 1;
  }
  
  /* Copyright (c) 2021 by Krar (https://codepen.io/Krar/pen/qYLzXN) */
  .submit-button {
    position: absolute;
    left: calc(20% - 2em);
    color: #cecd24;
    text-decoration: none;
    font-size: 2em;
    display: inline-block;
    font-family: Montserrat;
    text-transform: uppercase;
    padding: 0.1em 2em;
    border: 2px solid #cecd24;
    transition: 0.02s 0.2s cubic-bezier(0.1, 0, 0.1, 1);
  }
  .submit-button::before {
		content: "";
		display: inline-block;
		position: absolute;
		top: 0;
		left: 0;
		right: 100%;
		bottom: 0;
		background:#cecd24;
		transition: .3s .2s cubic-bezier(.1, 0, .1, 1), left .3s cubic-bezier(.1, 0, .1, 1);
		z-index: 25;
  }
  .submit-button::after {
		content: "";
		display: inline-block;
		background-image: url("https://image.flaticon.com/icons/png/128/109/109617.png");
    background-color:#cecd24;
		position: absolute;
		top: 0;
		left: calc(100% - 3em);
		right: 3em;
		bottom: 0;
		background-size: 1.5em;
		background-repeat: no-repeat;
		background-position: center;
		transition: right .3s cubic-bezier(.1, 0, .1, 1);

  }
  .submit-button:hover {
    /* padding: 0.5em 3.5em 0.5em 0.5em; */
    padding: 0.1em 3.5em 0.1em 0.5em
  }
  .submit-button:hover::before {
    left: calc(100% - 0.1em);
    right: 0;
    transition: .3s cubic-bezier(.1, 0, .1, 1), left .3s .2s cubic-bezier(.1, 0, .1, 1);
  }
  .submit-button:hover::after {
    right: 0;
		transition: right .3s .2s cubic-bezier(.1, 0, .1, 1);
  }
</style>
