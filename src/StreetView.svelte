<script lang="ts">
  import { getContext, onMount } from "svelte";
  import type { Loader } from "@googlemaps/js-api-loader";

  let container;
  let streetViewMap;
  let zoom = 12;
  let center = { lat: 35.3875841547467, lng: 139.4268758324958 };
  // let center = { lat: 35.330993, lng: 138.686413 }; //non-streetview compatible
  // let center = { lat: 35.375604, lng: 138.847289 };
  // 35.387067, 139.427211
  // 35.302675, 139.401206
  // 36.786637, 139.115713
  // 35.330993, 138.686413
  //　35.375604, 138.847289

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
