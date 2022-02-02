<script lang="ts">
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
  }
  ul.nav {
    padding-left: 0px;
    text-align: center;
  }
  ul.nav > li {
    display: inline-block;
    padding: 0.5em 0.5em;
  }
</style>