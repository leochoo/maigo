<script lang="ts">
  import logo from "../assets/svelte.png";
  import { db } from "../../firebase";
  import {
    collection,
    addDoc,
    query,
    where,
    getDoc,
    updateDoc,
    doc,
  } from "firebase/firestore";
  import { getAuth, signOut } from "firebase/auth";
  import Room from "./Room.svelte";
  import { amIhost, currentUser } from "../store";

  $: room_created = false;
  let room_id: string = "";
  async function createRoom() {
    console.log("creating room");
    const docRef = await addDoc(collection(db, "rooms"), {
      member_count: 1,
      ready_count: 0,
      user1: $currentUser.user.uid,
      user2: "",
      user3: "",
      user4: "",
    });
    room_id = docRef.id;
    console.log(room_id);
  }


  async function joinExistingRoom(room_id) {
    // Verify room id entered
    // Then try joining room with room id
    let roomRef = doc(db, "rooms", room_id);
    const docSnap = await getDoc(roomRef);
    if (docSnap.exists()) {
      let data = docSnap.data();
      let userList = [...data.users];
      // console.log("data is, ", data);
      console.log("ROOM FOUND");
      if (data.users.length < 4) {
        // Joining available, proceed to join
        console.log("Can join room now!");
        userList.push($currentUser.user.uid);
        await updateDoc(roomRef, {
          users: userList,
        });
      } else {
        // Room is full, stop the request
        console.log("Full room!")
      }
      // amIhost.set(false);
      // return true;
    } else {
      console.log("NO ROOM FOUND");
      // return false;
    }
  }
</script>

{#if !room_created}
  <main>
    <img src={logo} alt="Svelte Logo" />
    <h1>MaiGO</h1>
    <button
      on:click={async () => {
        await createRoom();
        amIhost.set(true);
        room_created = true;
      }}>Create Room</button>
    <input bind:value={room_id} />
    <button on:click={joinExistingRoom(room_id)}>Join Room</button>
<!--      on:click={async () => {-->
<!--        if (room_id != "") {-->
<!--          if (await existRoom()) {-->
<!--            amIhost.set(false);-->
<!--            room_created = true;-->
<!--          } else {-->
<!--            alert("NO ROOM FOUND");-->
<!--          }-->
<!--        } else {-->
<!--          alert("NO ROOM FOUND");-->
<!--        }-->
<!--      }}-->

    <p>A GeoGeussr Clone for Multiplayer Online</p>
    <p>HHLAB is a group of students from Keio University, Japan.</p>
    <button
      on:click={() => {
        const auth = getAuth();
        signOut(auth)
          .then(() => {
            console.log("signed out successfully");
          })
          .catch((error) => {
            console.log(error);
          });
      }}>Logout</button
    >
  </main>
{:else}
  <Room {room_id} />
{/if}

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
