<script lang="ts">
  import { getContext, onMount } from "svelte";
  import type { Loader } from "@googlemaps/js-api-loader";
  import { answer } from "../store";

  let container;
  let zoom = 12;
  let center = { lat: 35.3875841547467, lng: 139.4268758324958 };
  let marker: google.maps.Marker;
  let submit;
  $: _answer = $answer;
  $: if (marker) {
    submit = {
      lat: marker.getPosition().lat(),
      lng: marker.getPosition().lng(),
    };
  }
  const loader: Loader = getContext("loader");
  function initMap(): void {
    const myLatLng = { lat: -25.363, lng: 131.044 };
    const map = new google.maps.Map(container, {
      zoom,
      center,
      controlSize: 20,
      disableDefaultUI: true,
      zoomControl: true,
      clickableIcons: false,
      disableDoubleClickZoom: true,
    });
    google.maps.event.addListener(map, "click", (event: any) => {
      console.log("click");
      addMarker(event.latLng, map);
    });
  }

  function adjustLocationWithScale(location: google.maps.LatLngLiteral) {
    let adjustedLocation;
    return adjustedLocation;
  }

  function addMarker(
    location: google.maps.LatLngLiteral,
    map: google.maps.Map
  ) {
    let adjustedLocation = adjustLocationWithScale(location);
    if (marker != null) {
      console.log(location.lat());
      marker.setPosition(location);
    } else {
      marker = new google.maps.Marker({
        position: location,
        map: map,
      });
    }
  }

  function calcDistance(): void {
    let ans_latlng = new google.maps.LatLng(
      Number(_answer.lat),
      Number(_answer.lng)
    );
    let distance = google.maps.geometry.spherical.computeDistanceBetween(
      ans_latlng,
      marker.getPosition()
    );
    console.log(Math.floor(distance), "Meter(s)");
  }

  onMount(() => {
    loader.load().then(() => {
      initMap();
    });
  });
</script>

<div class="guessmap">
  <div class="guessmap-comp" bind:this={container} />
    <button
      class:selected="{marker != null}"
      on:click={() => {
        if (marker != null) {
          calcDistance();
        } else {
          console.log("no marker");
        }
      }}>submit</button
    >
</div>

<style>
  .guessmap {
    position: absolute;
    top: 65vh;
    left: 77vw;
    display: inline-block;
    opacity: 0.7;
    /* animation: fadeOut 1s; */
    transform-origin: bottom right;
  }
  .guessmap:hover {
    animation: fadeIn 0.2s;
    animation-fill-mode: forwards;
    /* transform: scale(2.7);
    transition-delay: 0s; */
  }
  @keyframes fadeIn{
    0% {
      opacity: 0.7;
    }
    100% {
      transform: scale(2.5);
      opacity: 1;
    }
  }
  @keyframes fadeOut {
    0% {
      transform: scale(2.5);
      opacity: 1;
    }
    88% {
      opacity: 1;
      transform: scale(2.5);
    }
    100% {
      opacity: 0.7;
    }
  }
  .guessmap-comp {
    width: 20vw;
    height: 25vh;
    z-index: 1;
  }
  button {
    position: absolute;
    color: red;
    text-decoration: none;
    font-size: 1em;
    font-family: Montserrat;
    text-transform: uppercase;
    left: 0;
    width: 100%;
    border: 2px solid red;
    text-decoration-line: line-through;
  }
  .selected {
    position: absolute;
    color: green;
    text-decoration: none;
    font-size: 1em;
    font-family: Montserrat;
    text-transform: uppercase;
    left: 0;
    width: 100%;
    border: 2px solid green;
  }
  .selected:hover {
    background: lightcyan;
  }
  /* .submit-button::before {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    right: 100%;
    bottom: 0;
    background: #cecd24;
    transition: 0.3s 0.2s cubic-bezier(0.1, 0, 0.1, 1),
      left 0.3s cubic-bezier(0.1, 0, 0.1, 1);
    z-index: 25;
  }
  .submit-button::after {
    content: "";
    display: inline-block;
    background-image: url("https://image.flaticon.com/icons/png/128/109/109617.png");
    background-color: #cecd24;
    position: absolute;
    top: 0;
    left: calc(100% - 3em);
    right: 3em;
    bottom: 0;
    background-size: 1.5em;
    background-repeat: no-repeat;
    background-position: center;
    transition: right 0.3s cubic-bezier(0.1, 0, 0.1, 1);
  }
  .submit-button:hover {

    padding: 0.1em 3.5em 0.1em 0.5em;
  }
  .submit-button:hover::before {
    left: calc(100% - 0.1em);
    right: 0;
    transition: 0.3s cubic-bezier(0.1, 0, 0.1, 1),
      left 0.3s 0.2s cubic-bezier(0.1, 0, 0.1, 1);
  }
  .submit-button:hover::after {
    right: 0;
    transition: right 0.3s 0.2s cubic-bezier(0.1, 0, 0.1, 1);
  }*/
</style>
