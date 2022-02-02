<script lang="ts">
  import { db } from "../../../firebase";
  import Modal from "./Modal.svelte";
  import { currentUser, amIhost } from "../../store";
  import { getContext } from 'svelte';
  import { onSnapshot, doc, updateDoc, increment } from "firebase/firestore";

  export let room_id: string;
  let updateGamePhase: () => void = getContext('updateGamePhase');
  let modal;
  let name = "";
  let isReady = false;
  let _amIhost = $amIhost;
  let readyCount: number;
  const updateName = async () => {
    const docRef = doc(db,"users",$currentUser.user.uid);
    await updateDoc(docRef, {
      displayName: name
    })
  };

  //Snapshot on ready_count, if all other users get ready, enable start game button
  const unsubGetReadyCount = onSnapshot(
    doc(db, "rooms", room_id),
    { includeMetadataChanges: false },
    (roomRef) => {
      let userNum = roomRef.data().users.length;
      readyCount = roomRef.data().ready_count;
      if (readyCount == userNum - 1) {
        isReady = true;
      }
      else {
        isReady = false;
      }
    }
  )
  
  //Increment ready_count. Disable the ready button once it's clicked
  const userGetReady = async() => {
    const docRef = doc(db, "rooms", room_id);
    await updateDoc(docRef, {
      ready_count: increment(1)
    });
    isReady = true;
  }
  
  const addEndTime = async () => {
    const docRef = doc(db,"rooms",room_id);
    var startTime: Date;
    var endTime: Date;
    // Set game time limits here
    const timeLimits:number = 5 
    // get the current time and add time limits to it. And add the calculated endTime in firestore
    const _currUTCTime = await fetch("https://worldtimeapi.org/api/timezone/Etc/UTC");
    const _data = await _currUTCTime.json();
    startTime = new Date(new Date(_data.datetime).getTime());
    endTime = new Date(new Date(_data.datetime).getTime()+timeLimits*60000);
    await updateDoc(docRef,{
      startTime: startTime,
      endTime: endTime
    });
  }
</script>

<template>
  <button on:click={() => modal.show()}>Name Change</button>
  <Modal bind:this={modal}>
  <h1 style="color:black;">Name Change</h1>
      <input type = "text" placeholder="name" bind:value={name}/>
      <button class="namebutton" on:click={() => {updateName(); modal.hide();}}>Confirm</button>
  </Modal>

  <span>Ready Count: {readyCount}</span>

  {#if _amIhost}
    <button on:click={async () =>{
      await addEndTime();
      updateGamePhase();
    }} disabled={!isReady}>Start game</button>
  {:else}
    <button on:click={async () => {
      await userGetReady();
    }} disabled={isReady}>Ready</button>
  {/if}
</template>

<style>
  button {
    background-color: white;
    border: none;
    color: #006633;
    padding: 5px 10px;
    margin: 0.5em;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 5px;
  }
  button:hover {
    background: lightcyan;
  }
  button:active {
    background: grey;
  }
  .namebutton {
    background-color: blanchedalmond;
  }
  .namebutton:hover {
    background: lightcyan;
  }
  .namebutton:active {
    background: gray;
  }
</style>