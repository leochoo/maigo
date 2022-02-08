<script lang="ts">
  export let room_id: string;
  //Users' information with scores
  export let userInfoList;
  let isLoading = true;
  console.log("2", userInfoList);
  let _userInfoList = userInfoList.sort((a, b) => {
    return a.score - b.score;
  });
  isLoading = false;
</script>

<template>
  <div>
    <p>Results for room "{room_id}"</p>
    {#if !isLoading}
      {#each _userInfoList as user }
        <li>
          <img src={user.photoURL} alt="" style="width:2em; height:2em"/>
          {user.displayName}'s distance diff: {user.score}m
        </li>
      {/each}
    {:else}
      Loading
    {/if}
  </div>
</template>

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
    color: white;
    /* add glass effect */
    background: rgba( 255, 255, 255, 0.15 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 4.5px );
    -webkit-backdrop-filter: blur( 4.5px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
  }
  p {
    color: whitesmoke;
  }
  li {
    color: whitesmoke;
    float:left;
    padding: 0.5em;
    list-style: none;
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
</style>