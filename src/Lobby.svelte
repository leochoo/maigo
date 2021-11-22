<script lang="ts">
  import logo from "./assets/svelte.png";
  import { db } from "../firebase"
  import { collection, addDoc, query, where, getDoc, doc } from "firebase/firestore";
  import Room from "./Room.svelte";
  import { amIhost } from "./store";
  $: room_created = false;
  let room_id:string = "";
  async function createRoom() {
    console.log("creating room");
    const docRef = await addDoc(collection(db, 'rooms'), {
      member_count: 1,
      ready_count: 0,
      user1: "user1",
      user2: "",
      user3: "",
      user4: ""
    });
    room_id = docRef.id;
    console.log(room_id);
  }

  async function existRoom() {
    const docSnap = await getDoc(doc(db, "rooms", room_id));
    if (docSnap.exists()){
      console.log("ROOM FOUND");
      return true;
    }
    else {
      console.log("NO ROOM FOUND")
      return false;
    }
  }
</script>

<main>
  {#if !room_created}
    <img src={logo} alt="Svelte Logo" />
    <h1>MaiGO</h1>
    <button on:click={async () => {
      await createRoom();
      amIhost.set(true);
      room_created = true;
    }}>Create Room</button>
    <input bind:value={room_id}/>
    <button on:click={async () => {
      if (room_id != ""){
        if (await existRoom()) {
          amIhost.set(false);
          room_created = true;
        }
        else {
          alert("NO ROOM FOUND")
        }
      }
      else {
        alert("NO ROOM FOUND");
      }
    }}>Join Room</button>
    <p>A GeoGeussr Clone for Multiplayer Online</p>
    <p>HHLAB is a group of students from Keio University, Japan.</p>
  {:else}
    <Room {room_id}></Room>
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
