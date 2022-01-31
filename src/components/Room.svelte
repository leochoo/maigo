<script lang="ts">
  import Game from "./Game/Game.svelte";
  import Chat from "./Chat/Chat.svelte";
  import { setContext } from "svelte";
  import { db } from "../../firebase";
  import {
    doc,
    getDoc,
    onSnapshot,
    updateDoc,
  } from "firebase/firestore";
  import BeforeGame from "./Game/BeforeGame.svelte";
  import AfterSubmit from "./Game/AfterSubmit.svelte";
  import DuringGame from "./Game/DuringGame.svelte";

  export let room_id: string;
  let gamePhase: number;
  let isLoading = true;
  let data: any = [];
  let userUidList = [];
  let userInfoList = [];
  let submitCount: number;

  async function updateGamePhase() {
    const roomRef = doc(db, "rooms", room_id);
    const docSnap = await getDoc(roomRef);
    await updateDoc(roomRef, {
      gamePhase: gamePhase + 1,
    });
  }
  setContext("updateGamePhase", updateGamePhase);

  // consider firestore latency compensation
  const unsub = onSnapshot(
    doc(db, "rooms", room_id),
    (roomRef) => {
      const source = roomRef.metadata.hasPendingWrites ? "Local" : "Server";
      let _userInfoList = [];
      console.log(source, " Current room data: ", roomRef.data());
      data = roomRef.data();
      userUidList = data.users;
      gamePhase = data.gamePhase;
      submitCount = data.submit_count;
      // get user data from userUidList using getDoc and push to userInfoList
      userUidList.forEach((userUid) => {
        const userRef = doc(db, "users", userUid);
        getDoc(userRef).then((userDoc) => {
          _userInfoList = [..._userInfoList, userDoc.data()];
        }).then(()=> {
          userInfoList = _userInfoList;
          console.log("userInfoList", userInfoList);
          isLoading = false;
        });
      });
    }
  );
</script>


{#if gamePhase==0}
  <div class="glasseffect">
    <h2>Room ID: {room_id}</h2>
    <ul>
      <h2>Current Users:</h2>
      {#each userInfoList as user}
        <li><img src={user.photoURL} alt="" style="width:2em; height:2em"/>{user.displayName}</li>
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
  <!-- <Chat {room_id} /> -->
  <AfterSubmit {room_id}/>
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
    /* add glass effect */
		background: rgba( 255, 255, 255, 0.15 );
		box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
		backdrop-filter: blur( 4.5px );
		-webkit-backdrop-filter: blur( 4.5px );
		border-radius: 10px;
		border: 1px solid rgba( 255, 255, 255, 0.18 );
  }
</style>