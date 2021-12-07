<script lang="ts">
  import { db } from "../../../firebase";
  import { getContext } from 'svelte';
  import { doc, onSnapshot, updateDoc, serverTimestamp } from "firebase/firestore";
  export let room_id: string;

  let data: any = [];
  let handlePhase = getContext('phaseChange');

  // consider firestore latency compensation
  const unsub = onSnapshot(doc(db, "rooms", room_id),{includeMetadataChanges: false}, (doc) => {
    const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
    console.log(source, " Current room data: ", doc.data());
    data = doc.data();
  });

  console.log("data: ", data);

  const addEndTime = async () => {
    const docRef = doc(db,"rooms",room_id);
    // put the current time for development purpose
    const currentServerTime = serverTimestamp();
    console.log("serverTime: ", currentServerTime);
    await updateDoc(docRef,{
      endTime: currentServerTime
    })
  }
</script>

<template>
  <p>Before Game</p>
  <h2>Room ID: {room_id}</h2>
  <ul>
    <h2>Users</h2>
    <li>{data.user1}</li>
    <li>{data.user2}</li>
    <li>{data.user3}</li>
    <li>{data.user4}</li>
  </ul>

  <button on:click={async ()=>{
    await addEndTime();
    handlePhase();
  }}>Start game</button>
</template>
