<script lang="ts">
  import Game from "./Game/Game.svelte";
  import Chat from "./Chat/Chat.svelte";

  import { db } from "../../firebase";
  import { setContext } from "svelte";
  import {
    doc,
    getDoc,
    onSnapshot,
    updateDoc,
    serverTimestamp,
  } from "firebase/firestore";

  export let room_id: string;
  let loading = false;
  let data: any = [];
  let userUidList = [];
  let userInfoList = [];
  let gamePhase: number;

  // consider firestore latency compensation
  const unsub = onSnapshot(
    doc(db, "rooms", room_id),
    { includeMetadataChanges: false },
    (roomRef) => {
      const source = roomRef.metadata.hasPendingWrites ? "Local" : "Server";
      let _userInfoList = [];
      console.log(source, " Current room data: ", roomRef.data());
      data = roomRef.data();
      userUidList = data.users;
      gamePhase = data.gamePhase;
      // get user data from userUidList using getDoc and push to userInfoList
      userUidList.forEach((userUid) => {
        const userRef = doc(db, "users", userUid);
        getDoc(userRef).then((userDoc) => {
          _userInfoList = [..._userInfoList, userDoc.data()];
        }).then(()=> {
          userInfoList = _userInfoList;
          console.log("userInfoList", userInfoList);
          loading = true;
        });
      });
    });
</script>


{#if gamePhase==0}
  <div class="glasseffect">
  <h2>Room ID: {room_id}</h2>
  <ul>
    <h2>Current Users:</h2>
    {#each userInfoList as user}
      <li><img src={user.photoURL} alt=""/>{user.displayName}</li>
    {/each}
  </ul>
  {#if loading}
  <Chat {room_id} />
  <Game {room_id} {gamePhase}/>
  {:else}
  Loading...
  {/if}
</div>
{:else}
  {#if loading}
  <!-- <Chat {room_id} /> -->
  <Game {room_id} {gamePhase}/>
  {:else}
  Loading...
  {/if}
{/if}

<style>
  .glasseffect {
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    padding: 1em;
    margin: 0 auto;
    width:500px;
    /* add glass effect */
		background: rgba( 255, 255, 255, 0.35 );
		box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
		backdrop-filter: blur( 4.5px );
		-webkit-backdrop-filter: blur( 4.5px );
		border-radius: 10px;
		border: 1px solid rgba( 255, 255, 255, 0.18 );
  }
</style>