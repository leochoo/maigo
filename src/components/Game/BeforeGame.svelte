<script lang="ts">
  import { db } from "../../../firebase";
  import { doc, onSnapshot } from "firebase/firestore";
  export let room_id: string;

  let data;
  let game_start = false;
  let userList = [];

  const unsub = onSnapshot(doc(db, "rooms", room_id), (doc) => {
    console.log("Current users: ", doc.data());
    data = doc.data();
    userList = data.users;
    console.log("userlist: ", userList);
  });
</script>

<template>
  <p>Before Game</p>
  <h2>Room ID: {room_id}</h2>
  <ul>
    <h2>Users</h2>
    {#each userList as user}
      <li>{user}</li>
    {/each}
  </ul>

  <button
    on:click={() => {
      game_start = true;
    }}>Start</button
  >
</template>
