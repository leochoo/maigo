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
  import { isSubmitted, room_available, remainTime, amIhost } from "../store.js";

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
  let submitUidList = [];

  $: if (gamePhase == 1 && leaveCount + replayCount == userUidList.length) {
    console.log("checking gamePhase", buttonClicked);

    buttonClicked = false;
    if (leaveCount >= replayCount) {
      deleteRoom();
    } else {
      //initialization of the room
      initRoom();
    }
  }

  $: if (!isLoading && submitCount != userUidList.length && $remainTime <= 0) {
    if ($amIhost) {
      //Find out who haven't submiited
      let notSubmitted = userUidList.filter((uid) => !submitUidList.includes(uid));
      console.log(notSubmitted);
      //Insert 0 to their user documents
      notSubmitted.forEach((uid) => {
        const userRef = doc(db, "users", uid);
        updateDoc(userRef, {
          score: 0,
        });
      });
      //Set submit_count == user_count
      showResultPage();
    }
  }

  async function showResultPage() {
    const docRef = doc(db, "rooms", room_id);
    await updateDoc(docRef, {
      submit_count: userUidList.length,
    });
  }

  async function updateGamePhase() {
    const roomRef = doc(db, "rooms", room_id);
    await updateDoc(roomRef, {
      gamePhase: gamePhase + 1,
    });
  }
  setContext("updateGamePhase", updateGamePhase);

  const userLeaveRoom = async () => {
    buttonClicked = true;
    $isSubmitted = false;
    const docRef = doc(db, "rooms", room_id);
    await updateDoc(docRef, {
      leave_count: increment(1),
    });
  };

  const userReplay = async () => {
    buttonClicked = true;
    $isSubmitted = false;
    const docRef = doc(db, "rooms", room_id);
    await updateDoc(docRef, {
      replay_count: increment(1),
    });
  };

  const deleteRoom = async () => {
    const docRef = doc(db, "rooms", room_id);
    await deleteDoc(docRef);
    room_available.set(false);
  };

  const initRoom = async () => {
    console.log("initRoom buttonClicked", buttonClicked);
    const docRef = doc(db, "rooms", room_id);
    $remainTime = 15;
    await updateDoc(docRef, {
      gamePhase: 0,
      leave_count: 0,
      ready_count: 0,
      replay_count: 0,
      submit_count: 0,
      endTime: 0,
      startTime: 0,
      submit_uid: [],
    });
  };

  // consider firestore latency compensation
  const unsub = onSnapshot(
    doc(db, "rooms", room_id),
    async (roomRef) => {
    isLoading = true;
    data = roomRef.data();
    userUidList = data.users;
    gamePhase = data.gamePhase;
    submitCount = data.submit_count;
    leaveCount = data.leave_count;
    replayCount = data.replay_count;
    submitUidList = data.submit_uid;
    // Have to wait for userInfoList to be updated
    const _userInfoList = await Promise.all(
      data.users.map(async (userUid) => {
        const userRef = doc(db, "users", userUid);
        const userDoc = await getDoc(userRef);
        return userDoc.data();
      })
    );
    userInfoList = _userInfoList;
    isLoading = false;
  });

  onMount(() => {
    console.log("onMount");
  });

  onDestroy(() => {
    console.log("onDestroy");
    return unsub;
  });
</script>

{#if gamePhase == 0}
  <div class="glasseffect">
    <h2>Room ID: {room_id}</h2>
    <h3>Current Users:</h3>
    <ul>
      {#each userInfoList as user}
        <li>
          <img src={user.photoURL} alt="" style="width:2em; height:2em" />
          <br />
          {user.displayName}
        </li>
      {/each}
    </ul>
    <Chat {room_id} />
    <BeforeGame {room_id} />
  </div>
<!-- Enter Result Page when submit counts equal to the number of users in the room -->
{:else if !isLoading && submitCount != userUidList.length && $remainTime <= 0 }
<div class="glasseffect">
  <div>Please wait</div>
</div>
{:else if !isLoading && submitCount == userUidList.length}
  <div class="glasseffect">
    <AfterSubmit {room_id} {userInfoList} />
    <Chat {room_id} />
    <span style="color: whitesmoke;">Leave Count: {leaveCount}</span>
    <span style="color: whitesmoke;">Replay Count: {replayCount}</span>
    <button
      on:click={async () => {
        await userLeaveRoom();
      }}
      disabled={buttonClicked}
    >
      Leave the Room
    </button>
    <button
      on:click={async () => {
        await userReplay();
      }}
      disabled={buttonClicked}
    >
      Replay
    </button>
  </div>
{:else if gamePhase == 1}
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
    width: 30em;
    /* height:40em; */
    color: white;
    /* add glass effect */
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4.5px);
    -webkit-backdrop-filter: blur(4.5px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
  }
  button {
    z-index: 1;
    background-color: whitesmoke;
    border: none;
    color: black;
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
  ul {
    padding: 0;
    list-style-type: none;
  }

  li {
    float: left;
    padding: 0.5em;
  }
</style>
