<script lang="ts">
  import { db } from "../../../firebase";
  import { getContext } from 'svelte';
  import { doc, onSnapshot, updateDoc } from "firebase/firestore";
  export let room_id: string;

  let data: any = [];
  let handlePhase = getContext('phaseChange');

  const unsub = onSnapshot(doc(db, "rooms", room_id), (doc) => {
    console.log("Current users: ", doc.data());
    data = doc.data();
  });

  console.log("data: ", data);

  const addEndTime = async () => {
    const docRef = doc(db,"rooms",room_id);
    console.log("endTime added");
    await updateDoc(docRef,{
      endTime:0
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

  <button on:click={()=>{
    handlePhase();
    addEndTime();
  }}>Start game</button>
</template>
