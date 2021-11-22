<script lang="ts">
  import logo from "./assets/svelte.png";
  import Map from "./Map.svelte";
  import StreetView from "./StreetView.svelte";
  import { onMount } from "svelte";
  import Room from "./Room.svelte";
  let room_created = false;
  onMount(() => {
  });
</script>

<main>
  {#if !room_created}
    <img src={logo} alt="Svelte Logo" />
    <h1>MaiGO</h1>
    <button on:click={() => {
      room_created = true;
      
      }}>Create Room</button>
    <input />
    <button on:click={() => {}}>Join Room</button>
    <p>A GeoGeussr Clone for Multiplayer Online</p>
    <p>HHLAB is a group of students from Keio University, Japan.</p>
  {:else}
    <Room></Room>
  {/if}
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  main {
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  img {
    height: 16rem;
    width: 16rem;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 14rem;
  }

  p {
    max-width: 14rem;
    margin: 1rem auto;
    line-height: 1.35;
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }

    p {
      max-width: none;
    }
  }
</style>
