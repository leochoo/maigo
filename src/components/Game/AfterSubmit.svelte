<link rel="stylesheet" href="src/styles.css">

<script lang="ts">
  import { onMount } from 'svelte';
  export let room_id: string;
  //Users' information with scores
  export let userInfoList;

</script>

<template>
  <div class="glasseffect">
    <p>Result</p>
    <p>Result of room "{room_id}"</p>
    {#each userInfoList as user }
      <li><img src={user.photoURL} alt="" style="width:2em; height:2em"/>{user.displayName}'s distance diff: {user.score}m</li>
    {/each}
  </div>
</template>

<style>
  p {
    color: whitesmoke;
  }
  li {
    color: whitesmoke;
  }
</style>