<script lang="ts">
  import { db } from "../../firebase";
  import { doc, onSnapshot } from "firebase/firestore";
  import Game from "./Game/Game.svelte";

  let data: any = [];
  let game_start = false;

  export let room_id: string;
  const unsub = onSnapshot(doc(db, "rooms", room_id), (doc) => {
    console.log("Current users: ", doc.data());
    data = doc.data();
  });
</script>

{#if !game_start}
  <h2>Room ID: {room_id}</h2>
  <ul>
    <h2>Users</h2>
    <li>{data.user1}</li>
    <li>{data.user2}</li>
    <li>{data.user3}</li>
    <li>{data.user4}</li>
  </ul>

  <button
    on:click={() => {
      game_start = true;
    }}>Start</button
  >
{:else}
  <Game />
{/if}
