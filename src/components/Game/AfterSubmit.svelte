<script lang="ts">
  import { score } from "../../store";
  export let room_id: string;
</script>

<template>
  <p>After Submit</p>
  <p>Result of Room {room_id}</p>
  <p>{$score}</p>
</template>
