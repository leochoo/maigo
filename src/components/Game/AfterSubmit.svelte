<script lang="ts">
  import { onMount } from 'svelte';
  export let room_id: string;
  //Users' information with scores
  export let userInfoList;

</script>

<template>
  <p>Result</p>
  <p>Result of room "{room_id}"</p>
  {#each userInfoList as user }
    <li><img src={user.photoURL} alt="" style="width:2em; height:2em"/>{user.displayName}'s score: {user.score}</li>
  {/each}
</template>

<style>
  p {
    color: whitesmoke;
  }
  li {
    color: whitesmoke;
  }
</style>