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
  setContext("gamePhase", gamePhase);
  // consider firestore latency compensation
  const unsub = onSnapshot(
    doc(db, "rooms", room_id),
    { includeMetadataChanges: false },
    (roomRef) => {
      const source = roomRef.metadata.hasPendingWrites ? "Local" : "Server";
      console.log(source, " Current room data: ", roomRef.data());
      data = roomRef.data();
      userUidList = data.users;
      gamePhase = data.gamePhase;
      // get user data from userUidList using getDoc and push to userInfoList
      userUidList.forEach((userUid) => {
        const userRef = doc(db, "users", userUid);
        getDoc(userRef).then((userDoc) => {
          userInfoList = [...userInfoList, userDoc.data()];
        });
      });
      // after done with create onSnapshot
      loading = true;
    }
  );
</script>

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
