<script lang="ts">
  import { db } from "../../../firebase";
  import { getContext, onDestroy } from "svelte";
  import {
    doc,
    onSnapshot,
    updateDoc,
    serverTimestamp,
  } from "firebase/firestore";
  export let room_id: string;

  let updateGamePhase:()=>void = getContext('updateGamePhase');

  const addEndTime = async () => {
    const docRef = doc(db, "rooms", room_id);
    // put the current time for development purpose
    const currentServerTime = serverTimestamp();
    console.log("serverTime: ", currentServerTime);
    await updateDoc(docRef, {
      endTime: currentServerTime,
    });
    console.log("update done");
  };

  // detach onSnapshot
  onDestroy(() => {
    console.log("BeforeGame destroyed");
    // unsub();
  });
</script>

<template>
  <p>Before Game</p>
  <button
    on:click={async () => {
      await addEndTime();
      updateGamePhase();
    }}>Start game</button
  >
</template>
