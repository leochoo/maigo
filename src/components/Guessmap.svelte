<script lang="ts">
  import { getContext, onMount } from "svelte";
  import type { Loader } from "@googlemaps/js-api-loader";
  import { answer } from "../store";
import { deleteApp } from "firebase/app";

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
      addMarker(event.latLng, map);
    });
  }


  function addMarker(
    location: google.maps.LatLngLiteral,
    map: google.maps.Map
  ) {
    if (marker != null) {
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

  function mouseOverAnimation(): void {
    console.log("over");
    let entireGuessMapBox = document.getElementById("guessmap");
    let guessMap = document.getElementById("guessmap-comp");
    let button = document.getElementById("button");
    button!.style.display = "inline";
    entireGuessMapBox!.style.opacity = "1";
    entireGuessMapBox!.style.top = 30 + 'vh';
    entireGuessMapBox!.style.left = 45 + 'vw';
    entireGuessMapBox!.style.width = 55 + 'vw';
    guessMap!.style.width = 50 + 'vw';
    guessMap!.style.height = 60 + 'vh';
  }
  function mouseOutAnimation(): void {
    console.log("out");
    let entireGuessMapBox = document.getElementById("guessmap");
    let guessMap = document.getElementById("guessmap-comp");
    let button = document.getElementById("button");
    button!.style.display = "none";
    entireGuessMapBox!.style.opacity = "0.7";
    entireGuessMapBox!.style.top = 65 + 'vh';
    entireGuessMapBox!.style.left = 77 + 'vw';
    entireGuessMapBox!.style.width = 20 + 'vw';
    guessMap!.style.width = 20 + 'vw';
    guessMap!.style.height = 25 + 'vh';
  }
  
  onMount(() => {
    loader.load().then(() => {
      initMap();
    });
  });
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div class="guessmap" id="guessmap" on:mouseover={mouseOverAnimation} on:mouseout={mouseOutAnimation}>
  <div class="guessmap-comp" id="guessmap-comp" bind:this={container} />
  <button
    id = "button"
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
    transform-origin: bottom right;
    border: 0px solid   red;
  }
  /* .guessmap:hover {
    animation: fadeIn 0.2s;
    animation-fill-mode: forwards;
  } */
  /* @keyframes fadeIn{
    0% {
      opacity: 0.7;
      top: 65vh;
      left: 77vw;
    }
    100% {
      opacity: 1;
      top: 30vh;
      left: 45vw;
      width: 50vw;
    }
  } */
  /* @keyframes fadeInMap {
    0% {
    }
    100% {
      width: 50vw;
      height: 60vh;
    }
  } */
  .guessmap-comp {
    width: 20vw;
    height: 25vh;
    z-index: 1;
    border: 0px solid green;
  }
  /* .guessmap-comp:hover {
    animation: fadeInMap 0.2s;
    animation-fill-mode: forwards;
  } */
  button {
    position: absolute;
    color: red;
    text-decoration: none;
    font-size: 1em;
    font-family: Montserrat;
    text-transform: uppercase;
    left: 15%;
    width: 25%;
    top: 406px;
    z-index: 5;
    display: none;
    text-decoration-line: line-through;
  }
  .selected {
    position: absolute;
    color: blue;
    text-decoration: none;
    font-size: 1em;
    font-family: Montserrat;
    text-transform: uppercase;
    left: 15%;
    width: 25%;
    top: 406px;
    z-index: 5;
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
