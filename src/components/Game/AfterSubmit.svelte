<script lang="ts">
  import { onMount } from 'svelte';
  export let room_id: string;
  export let userInfoList;

</script>

<template>
  <p>After Submit</p>
  <p>Result of Room {room_id}</p>
  {#each userInfoList as user }
    <li><img src={user.photoURL} alt="" style="width:2em; height:2em"/>{user.displayName}'s score: {user.score}</li>
  {/each}
</template>
