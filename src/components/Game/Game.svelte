<script lang="ts">
  import { onMount, setContext, getContext } from "svelte";
  import BeforeGame from "./BeforeGame.svelte";
  import DuringGame from "./DuringGame.svelte";
  import AfterSubmit from "./AfterSubmit.svelte";
  import { db } from "../../../firebase";
  import {
    getDoc,
    updateDoc,
    doc,
  } from "firebase/firestore";

  export let room_id: string;
  export let gamePhase: number;

  //async function that increments gamePhase of room document. It is stored as setContext
  async function updateGamePhase() {
    const roomRef = doc(db, "rooms", room_id);
    const docSnap = await getDoc(roomRef);
    await updateDoc(roomRef, {
      gamePhase: gamePhase + 1,
    });
  }
  onMount(()=>{
    console.log("GP", gamePhase);
  });
  setContext("updateGamePhase", updateGamePhase);
</script>

{#if gamePhase == 0}
  <BeforeGame {room_id} />
{:else if gamePhase == 1}
  <DuringGame {room_id} />
{:else if gamePhase == 2}
  <AfterSubmit {room_id}/>
{/if}