<script lang="ts">
  import { db } from "../../../firebase";
  import { getContext, onDestroy } from "svelte";
  import {
    doc,
    updateDoc,
    serverTimestamp,
  } from "firebase/firestore";
  import Modal from "./Modal.svelte";
  import { currentUser } from "../../store";

  export let room_id: string;

  let handlePhase = getContext("phaseChange");
  let game_start = false;
  let modal;
  let name = "";

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

  const updateName = async () => {
    const docRef = doc(db,"users",$currentUser.user.uid);
    await updateDoc(docRef, {
      displayName: name
    })
  };

  // detach onSnapshot
  onDestroy(() => {
    console.log("BeforeGame destroyed");
    // unsub();
  });
</script>

<template>
  <p>Before Game</p>
  <button on:click={() => modal.show()}>Name Change</button>
  <Modal bind:this={modal}>
  <h1>Name Change</h1>
      <input type = "text" placeholder="name" bind:value={name}/>
      <button on:click= {updateName}>Confirm</button>
  </Modal>
  <button
    on:click={async () => {
      await addEndTime();
      handlePhase();
    }}>Start game</button
  >
</template>
