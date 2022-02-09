<script lang="ts">
  export let room_id: string;
  //Users' information with scores
  export let userInfoList;
  console.log("2", userInfoList);
  let _userInfoList = userInfoList.sort((a, b) => {
    return a.score - b.score;
  });
</script>

<template>
  <div>
    <p>Results for room "{room_id}"</p>
      {#each _userInfoList as user }
        <li>
          <img src={user.photoURL} alt="" style="width:2em; height:2em"/>
          {user.displayName}'s distance diff: {user.score}m
        </li>
      {/each}
  </div>
</template>

<style>
  p {
    color: whitesmoke;
  }
  li {
    color: whitesmoke;
    float:left;
    padding: 0.5em;
    list-style: none;
  }
</style>