<script lang="ts">
  // generate random gps coordinate between position_a and position_c
  import { doc, setDoc } from "firebase/firestore";
  import { db } from "../firebase";
  import { getContext, onMount } from "svelte";

  import type { Loader } from "@googlemaps/js-api-loader";

  const addNewData = async (abc) => {
    console.log("abc", abc);
    await getRandomCoords();
    await setDoc(doc(db, "coordinates", "randomLocations"), {
      tokyo: abc,
    });
  };

  let abc = [
    { lat: 35.663639, lng: 139.650704 },
    { lat: 35.663639, lng: 139.650704 },
  ];

  function generateRandomPosition() {
    let position_a = { lat: 35.663639, lng: 139.650704 };
    let position_c = { lat: 35.771422, lng: 139.869803 };
    let lat =
      position_a.lat + Math.random() * (position_c.lat - position_a.lat);
    let lng =
      position_a.lng + Math.random() * (position_c.lng - position_a.lng);
    return { lat, lng };
  }

  // generate 10 random gps coordinates and store if the gps locaiton has valid streetview

  let random_positions = [];
  const loader: Loader = getContext("loader");

  async function getRandomCoords() {
    for (let i = 0; i < 10; i++) {
      let container;
      let streetViewMap;
      let zoom = 12;
      let center = generateRandomPosition();
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
              });
              // streetViewMap.setStreetView(panorama);
              console.log("Valid streetview");
              console.log("center:", center);
              random_positions.push(center);
            } else {
              console.log("Invalid random streetview");
            }
          }
        );
      });
    }
  }

  addNewData(random_positions);
  console.log(random_positions);
</script>

<style></style>
