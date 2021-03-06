<script lang="ts">
  import { getContext, onMount } from "svelte";
  import type { Loader } from "@googlemaps/js-api-loader";
  import { answer, currentUser, isSubmitted } from "../../store";
  import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
  import { db } from "../../../firebase";

  export let room_id: string;
  let container;
  let zoom = 12;
  let center = { lat: 35.3875841547467, lng: 139.4268758324958 };
  let marker: google.maps.Marker;
  let submit;
  let buttonClicked = false;

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
  //Calculate the difference of distances and store it in user document.
  async function calcDistance() {
    let ans_latlng = new google.maps.LatLng(
      Number(_answer.lat),
      Number(_answer.lng)
    );
    let distance = google.maps.geometry.spherical.computeDistanceBetween(
      ans_latlng,
      marker.getPosition()
    );
    const userRef = doc(db, "users", $currentUser.user.uid);
    await updateDoc(userRef, {
      score: Math.floor(distance),
    });
  }

  function mouseOverAnimation(): void {
    let entireGuessMapBox = document.getElementById("guessmap");
    let guessMap = document.getElementById("guessmap-comp");
    let button = document.getElementById("button");
    button!.style.display = "inline";
    entireGuessMapBox!.style.opacity = "1";
    entireGuessMapBox!.style.top = 30 + "vh";
    entireGuessMapBox!.style.left = 45 + "vw";
    entireGuessMapBox!.style.width = 55 + "vw";
    guessMap!.style.width = 50 + "vw";
    guessMap!.style.height = 60 + "vh";
    button!.style.width = "50vw";
    button!.style.height = "7vh";
    button!.style.top = "100%";
  }
  function mouseOutAnimation(): void {
    let entireGuessMapBox = document.getElementById("guessmap");
    let guessMap = document.getElementById("guessmap-comp");
    let button = document.getElementById("button");
    button!.style.display = "none";
    entireGuessMapBox!.style.opacity = "0.7";
    entireGuessMapBox!.style.top = 65 + "vh";
    entireGuessMapBox!.style.left = 77 + "vw";
    entireGuessMapBox!.style.width = 20 + "vw";
    guessMap!.style.width = 20 + "vw";
    guessMap!.style.height = 25 + "vh";
  }

  const userSubmit = async () => {
    const docRef = doc(db, "rooms", room_id);
    await updateDoc(docRef, {
      submit_count: increment(1),
    });
    await updateDoc(docRef, {
      submit_uid: arrayUnion($currentUser.user.uid),
    });
    console.log("userSubmit");
  };

  onMount(() => {
    loader.load().then(() => {
      initMap();
    });
  });
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div
  class="guessmap"
  id="guessmap"
  on:mouseover={mouseOverAnimation}
  on:mouseout={mouseOutAnimation}
>
  <div class="guessmap-comp" id="guessmap-comp" bind:this={container} />
  <button
    id="button"
    class:selected={marker != null}
    on:click={async () => {
      if (marker != null) {
        buttonClicked = true;
        $isSubmitted = true;
        await calcDistance();
        await userSubmit();
      }
    }}
    disabled={buttonClicked}>submit</button
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
    border: 0px solid red;
  }
  .guessmap-comp {
    width: 20vw;
    height: 25vh;
    z-index: 1;
    border: 0px solid green;
  }
  button {
    position: absolute;
    background-color: rgba(220, 53, 69, 0.9);
    color: white;
    text-decoration: none;
    font-size: 1.5em;
    font-weight: 400;
    font-family: Montserrat;
    text-transform: uppercase;
    left: 0;
    top: 0;
    z-index: 5;
    display: none;
    text-decoration-line: line-through;
  }
  .selected {
    position: absolute;
    background-color: rgba(13, 110, 25, 0.9);
    color: white;
    text-decoration: none;
    font-size: 1.5em;
    font-weight: 400;
    font-family: Montserrat;
    text-transform: uppercase;
    left: 0;
    top: 0;
    z-index: 5;
  }
  .selected:hover {
    background: rgba(6, 88, 16, 0.9);
  }
  .selected:active {
    background: gray;
  }
  .selected:disabled {
    color: white;
    text-decoration-line: line-through;
  }
</style>