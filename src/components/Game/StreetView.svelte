<script lang="ts">
  import { getContext, onMount, setContext } from "svelte";
  import type { Loader } from "@googlemaps/js-api-loader";
  // import { generateRandomPosition, addNewData } from "./coordinates.svelte";
  import { doc, getDoc } from "firebase/firestore";
  import { db } from "../../../firebase";
  import { answer, panorama } from "../../store";

  let container;
  //let panorama: google.maps.StreetViewPanorama;
  let _answer;
  const loader: Loader = getContext("loader");

  onMount(() => {
    async function fetchRandomPosition() {
      const docRef = doc(db, "coordinates", "randomLocations");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const _answers = docSnap.get("tokyo");
        const randomIndex = Math.floor(Math.random() * 949); //0 ~ 948
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
                let _panorama = new google.maps.StreetViewPanorama(container, {
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
                panorama.set(_panorama);
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

      function CenterControl(controlDiv: Element, map) {
        // Set CSS for the control border.
        const controlUI = document.createElement("div");
    
        controlUI.style.backgroundColor = "#fff";
        controlUI.style.border = "2px solid #fff";
        controlUI.style.borderRadius = "3px";
        controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
        controlUI.style.cursor = "pointer";
        controlUI.style.marginTop = "8px";
        controlUI.style.marginBottom = "22px";
        controlUI.style.textAlign = "center";
        controlUI.title = "Click to recenter the map";
        controlDiv.appendChild(controlUI);
    
        // Set CSS for the control interior.
        const controlText = document.createElement("div");
    
        controlText.style.color = "rgb(25,25,25)";
        controlText.style.fontFamily = "Roboto,Arial,sans-serif";
        controlText.style.fontSize = "16px";
        controlText.style.lineHeight = "38px";
        controlText.style.paddingLeft = "5px";
        controlText.style.paddingRight = "5px";
        controlText.innerHTML = "Center Map";
        controlUI.appendChild(controlText);
        
    
        // Setup the click event listeners: simply set the map to Chicago.
        controlUI.addEventListener("click", () => {
          map.setCenter(_answer);
        });
      }
      renderStreetView();
    }
  );

</script>

<div class="streetview-comp" bind:this={container} />

<style>
  .streetview-comp {
    width: 100vw;
    height: 100vh;
    z-index: 0;
  } 
</style>
