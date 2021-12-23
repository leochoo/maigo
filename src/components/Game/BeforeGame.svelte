<script lang="ts">
  import { db } from "../../../firebase";
  import { getContext } from 'svelte';
  import { doc, onSnapshot, updateDoc } from "firebase/firestore";
  import { currTimeUTC } from '../../store';
  export let room_id: string;

  let updateGamePhase: () => void = getContext('updateGamePhase');
  
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
  <button on:click={async () =>{
    await addEndTime();
    updateGamePhase();
    console.log("button clicked");
  }}>Start game</button>
</template>