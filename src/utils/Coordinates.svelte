<script lang="ts">
  // generate random gps coordinate between position_a and position_c
  import { doc, setDoc } from "firebase/firestore";
  import { db } from "../../firebase";
  import { getContext, onMount } from "svelte";
  import type { Loader } from "@googlemaps/js-api-loader";

  // genererate Random gps position
  function generateRandomPosition() {
    let position_a = { lat: 35.663639, lng: 139.650704 };
    let position_c = { lat: 35.771422, lng: 139.869803 };
    let lat =
      position_a.lat + Math.random() * (position_c.lat - position_a.lat);
    let lng =
      position_a.lng + Math.random() * (position_c.lng - position_a.lng);
    return { lat, lng };
  }

  // verify if the gps coordinate has a valid streetview
  async function verifyStreetView(randomPosition) {
    const loader: Loader = getContext("loader");
    await loader.load();
    let streetViewService = new google.maps.StreetViewService();
    let request = {
      location: randomPosition,
      preference: google.maps.StreetViewPreference.BEST,
    };
    let result = await new Promise((resolve, reject) => {
      streetViewService.getPanorama(request, (data, status) => {
        if (status === "OK") {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
    return result;
  }

  // generate 100 random gps coordinates, and verify if they have a valid streetview
  async function generateRandomGpsCoordinates() {
    let randomGpsCoordinates = [];
    for (let i = 0; i < 100; i++) {
      let randomPosition = generateRandomPosition();
      let result = await verifyStreetView(randomPosition);
      if (result) {
        randomGpsCoordinates.push(randomPosition);
      }
    }
    return randomGpsCoordinates;
  }

  // push a list of new gps coordinates to firestore
  async function saveRandomPositions() {
    let randomGpsCoordinates = await generateRandomGpsCoordinates();
    console.log("randomGpsCoordinates ", randomGpsCoordinates);
    await setDoc(doc(db, "coordinates", "randomLocations"), {
      tokyo: randomGpsCoordinates,
    });
  }

  saveRandomPositions();
</script>

<style></style>
