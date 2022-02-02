<script lang="ts">
  import Chat from "./Chat/Chat.svelte";
  import { onDestroy, setContext, onMount } from "svelte";
  import { db } from "../../firebase";
  import {
    deleteDoc,
    doc,
    getDoc,
    increment,
    onSnapshot,
    updateDoc,
  } from "firebase/firestore";
  import BeforeGame from "./Game/BeforeGame.svelte";
  import AfterSubmit from "./Game/AfterSubmit.svelte";
  import DuringGame from "./Game/DuringGame.svelte";
  import { room_available } from '../store.js'

  export let room_id: string;
  let gamePhase: number;
  let isLoading = true;
  let data: any = [];
  let userUidList = [];
  let userInfoList = [];
  let submitCount: number;
  let leaveCount: number = 0;
  let replayCount: number = 0;
  let buttonClicked = false;
  
  $: if (gamePhase == 1 && leaveCount + replayCount == userUidList.length) {
    if (leaveCount >= replayCount) {
      deleteRoom();
    }
    else {
      //initialization of the room
      initRoom();
    }
  }

  async function updateGamePhase() {
    const roomRef = doc(db, "rooms", room_id);
    await updateDoc(roomRef, {
      gamePhase: gamePhase + 1,
    });
  }
  setContext("updateGamePhase", updateGamePhase);

  const userLeaveRoom = async() => {
    const docRef = doc(db, "rooms", room_id);
    await updateDoc(docRef, {
      leave_count: increment(1)
    });
    buttonClicked = true;
  }

  const userReplay = async () => {
    const docRef = doc(db, "rooms", room_id);
    await updateDoc(docRef, {
      replay_count: increment(1)
    });
    buttonClicked = true;
  }

  const deleteRoom = async () => {
    const docRef = doc(db, "rooms", room_id);
    await deleteDoc(docRef);
    room_available.set(false);
  }

  const initRoom = async () => {
    const docRef = doc(db, "rooms", room_id);
    await updateDoc(docRef, {
      gamePhase: 0,
      leave_count: 0,
      ready_count: 0,
      replay_count: 0,
      submit_count: 0,
      endTime: 0,
      startTime: 0,
    })
  }

  // consider firestore latency compensation
  const unsub = onSnapshot(
    doc(db, "rooms", room_id),
    (roomRef) => {
      const source = roomRef.metadata.hasPendingWrites ? "Local" : "Server";
      let _userInfoList = [];
      //console.log(source, " Current room data: ", roomRef.data());
      data = roomRef.data();
      userUidList = data.users;
      gamePhase = data.gamePhase;
      submitCount = data.submit_count;
      leaveCount = data.leave_count;
      replayCount = data.replay_count;
      // get user data from userUidList using getDoc and push to userInfoList
      userUidList.forEach((userUid) => {
        const userRef = doc(db, "users", userUid);
        getDoc(userRef).then((userDoc) => {
          _userInfoList = [..._userInfoList, userDoc.data()];
        }).then(()=> {
          userInfoList = _userInfoList;
          isLoading = false;
        });
      });
    }
  );
  onDestroy(()=>unsub);
</script>

{#if gamePhase==0}
  <div class="glasseffect">
    <h2>Room ID: {room_id}</h2>
      <h3>Current Users:</h3>
    <ul>
      {#each userInfoList as user}
        <li>
          <img src={user.photoURL} alt="" style="width:2em; height:2em"/>
          <br>
          {user.displayName}
        </li>
      {/each}
    </ul>
    {#if !isLoading}
      <Chat {room_id} />
      <BeforeGame {room_id}/>
    {:else}
      Loading...
    {/if}
  </div>
<!-- Enter Result Page when submit counts equal to the number of users in the room -->
{:else if submitCount == userUidList.length}
  <AfterSubmit {room_id} {userInfoList}/>
  <Chat {room_id} />
  <span style="color: whitesmoke;">Leave Count: {leaveCount}</span>
  <span style="color: whitesmoke;">Replay Count: {replayCount}</span>
  <button on:click={async () =>{
    await userLeaveRoom();
  }} disabled={buttonClicked}>
    Leave the Room
  </button>
  <button on:click={async ()=>{
    await userReplay();
  }} disabled={buttonClicked}>
    Replay
  </button>
{:else if gamePhase == 1}
  <!-- <Chat {room_id} /> -->
  <DuringGame {room_id}/>
{/if}

<style>
  .glasseffect {
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    padding: 1em;
    margin: 0 auto;
    width:30em;
    height:38em;
    color: white;
    /* add glass effect */
    background: rgba( 255, 255, 255, 0.15 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 4.5px );
    -webkit-backdrop-filter: blur( 4.5px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
  }
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
  ul{
    padding:0;
    list-style-type:none;
  }

  li{
      float:left;
      padding: 0.5em;
  }

</style>