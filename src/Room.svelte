<script lang="ts">
  import { db } from "../firebase"
  import { doc, onSnapshot } from "firebase/firestore";
  import Game from './Game.svelte';
  let data:any = [];
  let game_start = false;
  export let room_id:string;
  const unsub = onSnapshot(doc(db, "rooms", room_id), (doc) => {
      console.log("Current data: ", doc.data());
      data = doc.data();
  });
  
</script>
{#if !game_start}
<li>{data.user1}</li>
<li>{data.user2}</li>
<li>{data.user3}</li>
<li>{data.user4}</li>

<button on:click={() => {game_start=true}}>Start</button>
{:else}
  <Game></Game>
{/if}