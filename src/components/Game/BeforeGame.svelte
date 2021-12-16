<script lang="ts">
  import { db } from "../../../firebase";
  import { getContext, onDestroy, onMount } from 'svelte';
  import { doc, onSnapshot, updateDoc } from "firebase/firestore";
  import { amIhost, currTimeUTC } from '../../store';
  export let room_id: string;

  let data: any = [];
  let handlePhase:()=>void = getContext('phaseChange');
  let userList = [];

  // consider firestore latency compensation
  const unsub = onSnapshot(doc(db, "rooms", room_id),{includeMetadataChanges: false}, (doc) => {
    const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
    console.log(source, " Current room data: ", doc.data());
    data = doc.data();
    userList = data.users;
    console.log("userlist: ", userList);
  });

  const addEndTime = async () => {
    const docRef = doc(db,"rooms",room_id);
    var endTime: Date;
    // Set game time limits here
    const timeLimits:number = 5 

    // get the current time and add time limits to it. And add the calculated endTime in firestore
    const _currUTCTime = await fetch("http://worldtimeapi.org/api/timezone/Etc/UTC");
    const _data = await _currUTCTime.json();
    currTimeUTC.set(_data.datetime);
    endTime = new Date(new Date($currTimeUTC).getTime()+timeLimits*60000);
    await updateDoc(docRef,{
        endTime: endTime
      })
  }
</script>

<template>
  <p>Before Game</p>
  <h2>Room ID: {room_id}</h2>
  <ul>
    <h2>Users</h2>
    {#each userList as user}
      <li>{user}</li>
    {/each}
  </ul>

  <button on:click={async () =>{
    // TODO: players except host do not wait this -> they get undefined for endTime in Timer component
    if($amIhost==true){
      await addEndTime();
    }
    handlePhase();
  }}>Start game</button>
</template>