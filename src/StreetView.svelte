<script lang="ts">
  import { getContext, onMount } from "svelte";
  import type { Loader } from "@googlemaps/js-api-loader";
  // import { generateRandomPosition, addNewData } from "./coordinates.svelte";
  import { doc, setDoc, addDoc, collection } from "firebase/firestore";
  import { db } from "../firebase";

  let container;
  let streetViewMap;
  let zoom = 12;
  // let center = generateRandomPosition();
  let center = { lat: 35.663639, lng: 139.650704 };
  // console.log("Center", center);

  const loader: Loader = getContext("loader");
  loader.load().then(() => {
    let streetViewService = new google.maps.StreetViewService();
    streetViewService.getPanorama(
      {
        location: center,
        preference: google.maps.StreetViewPreference.BEST,
      },
      (data, status) => {
        if (status === "OK") {
          let panorama = new google.maps.StreetViewPanorama(container, {
            position: center,
            pov: {
              heading: 34,
              pitch: 10,
            },
          });
          // streetViewMap.setStreetView(panorama);
          console.log("Valid streetview");
        } else {
          console.log("no streetview");
        }
      }
    );
    streetViewMap = new google.maps.StreetViewPanorama(container, {
      zoom,
      position: center,
      disableDefaultUI: true,
    });
    console.log("streetviewmap", streetViewMap);
    console.log("status:", streetViewMap.StreetViewStatus);
  });
</script>

<div class="streetview-comp" bind:this={container} />

<style>
  .streetview-comp {
    width: 100vw;
    height: 60vh;
  }
</style>
