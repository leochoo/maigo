<script lang="ts">
  import { db } from "../../../firebase";
  import Modal from "./Modal.svelte";
  import { currentUser, currTimeUTC } from "../../store";
  import { getContext } from 'svelte';
  import { doc, onSnapshot, updateDoc, serverTimestamp } from "firebase/firestore";
  export let room_id: string;
  let updateGamePhase: () => void = getContext('updateGamePhase');
  let modal;
  let name = "";
  
  const update = async () => {
    const docRef = doc(db,"users",$currentUser.user.uid);
    await updateDoc(docRef, {
      displayName: name
    })
  };
  
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
  <button on:click={() => modal.show()}>Name Change</button>
  <Modal bind:this={modal}>
  <h1>Name Change</h1>
      <input type = "text" placeholder="name" bind:value={name}/>
      <button on:click= {updateName}>Confirm</button>
  </Modal>
  <h2>Room ID: {room_id}</h2>
  <button on:click={async () =>{
    await addEndTime();
    updateGamePhase();
    console.log("button clicked");
  }}>Start game</button>
</template>
