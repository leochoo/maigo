<script lang="ts">
  import Guessmap from "../Guessmap.svelte";
  import Streetview from "../Streetview.svelte";
  import { Loader } from "@googlemaps/js-api-loader";
  import { onMount, setContext, getContext } from "svelte";
  import BeforeGame from "./BeforeGame.svelte";
  import DuringGame from "./DuringGame.svelte";
  import AfterSubmit from "./AfterSubmit.svelte";
  import AfterGame from "./AfterGame.svelte";
  import { db } from "../../../firebase";
  import {
    getDoc,
    updateDoc,
    doc,
  } from "firebase/firestore";

  export let room_id: string;
  export let gamePhase: number;
  async function updateGamePhase() {
    const roomRef = doc(db, "rooms", room_id);
    const docSnap = await getDoc(roomRef);
    await updateDoc(roomRef, {
      gamePhase: gamePhase + 1,
    });
  }
  setContext("updateGamePhase", updateGamePhase);
  console.log("gamePhase from Game.svelte", gamePhase);
</script>
{#if gamePhase == 0}
  <BeforeGame {room_id} />
{:else if gamePhase == 1}
  <DuringGame {room_id} />
{:else if gamePhase == 2}
  <AfterSubmit />
{:else if gamePhase == 3}
  <AfterGame />
{/if}