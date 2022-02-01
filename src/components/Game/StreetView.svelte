<script lang="ts">
  import { getContext, onMount, setContext } from "svelte";
  import type { Loader } from "@googlemaps/js-api-loader";
  // import { generateRandomPosition, addNewData } from "./coordinates.svelte";
  import { doc, setDoc, addDoc, collection, getDoc } from "firebase/firestore";
  import { db } from "../../../firebase";
  import { answer } from "../../store";

  let container;
  let streetViewMap;
  let zoom = 12;
  let _answer;
  const loader: Loader = getContext("loader");

  onMount(() => {
    async function fetchRandomPosition() {
      const docRef = doc(db, "coordinates", "randomLocations");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const _answers = docSnap.get("tokyo");
        const randomIndex = Math.floor(Math.random() * 95); //0 ~ 94
        _answer = _answers[randomIndex];
      } else {
        console.log("No doc");
      }
    }
    async function renderStreetView() {
      await fetchRandomPosition();
      loader
        .load()
        .then(() => {
          let streetViewService = new google.maps.StreetViewService();
          streetViewService.getPanorama(
            {
              location: _answer,
              preference: google.maps.StreetViewPreference.BEST,
            },
            (data, status) => {
              if (status === "OK") {
                let panorama = new google.maps.StreetViewPanorama(container, {
                  position: _answer,
                  pov: {
                    heading: 34,
                    pitch: 10,
                  },
                  linksControl: true,
                  panControl: true,
                  panControlOptions: {
                    position: google.maps.ControlPosition.TOP_RIGHT
                  },
                  zoomControlOptions: {
                    position: google.maps.ControlPosition.TOP_RIGHT
                  },
                  enableCloseButton: false,
                  addressControl: false,
                  fullscreenControl: false,
                  disableDefaultUI: true,
                });
                //streetViewMap.setStreetView(panorama);
                console.log("Valid streetview");
              } else {
                console.log("no streetview");
              }
            }
          );
        })
        .then(() => {
          answer.set(_answer);
        });
    }
    renderStreetView();
  });
</script>

<div class="streetview-comp" bind:this={container} />

<style>
  .streetview-comp {
    width: 100vw;
    height: 100vh;
    z-index: 0;
  }
</style>
