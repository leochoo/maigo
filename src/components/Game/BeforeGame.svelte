<script lang="ts">
  import { db } from "../../../firebase";
  import { getContext, onDestroy, onMount } from 'svelte';
  import { doc, onSnapshot, updateDoc } from "firebase/firestore";
  import { amIhost } from '../../store';
  export let room_id: string;

  let data: any = [];
  let handlePhase:()=>void = getContext('phaseChange');
  let game_start = false;
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

    const currUTCTime = await fetch("http://worldtimeapi.org/api/timezone/Etc/UTC");
    const data = await currUTCTime.json();
    console.log("utc date.datetime: ",data.datetime);
    // TODO: change to UTC time
    // console.log("fetched data: ",new Date(new Date(data.datetime).getTime()+new Date(data.datetime).getTimezoneOffset()*60000));
    endTime = new Date(new Date(data.datetime).getTime()+timeLimits*60000);
    console.log("endTime: ",endTime);
    await updateDoc(docRef,{
        endTime: endTime
      })
  }

  // detach onSnapshot
  onDestroy(()=>{
    // unsub();
  })

  onMount(()=>{
    console.log("amIHost: ",$amIhost);
  })
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
    // TODO: players except host do not wait this
    if($amIhost==true){
      await addEndTime();
    }
    handlePhase();
  }}>Start game</button>
</template>
