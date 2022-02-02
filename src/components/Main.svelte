<script lang="ts">
  import { db } from "../../firebase";
  import {
    collection,
    addDoc,
    getDoc,
    updateDoc,
    doc,
  } from "firebase/firestore";
  import { getAuth, signOut } from "firebase/auth";
  import Room from "./Room.svelte";
  import { amIhost, currentUser, room_available } from "../store";


  let room_id: string = "";

  async function createRoom() {
    console.log("creating room");
    const docRef = await addDoc(collection(db, "rooms"), {
      ready_count: 0,
      users: [$currentUser.user.uid],
      gamePhase: 0,
      submit_count: 0,
      leave_count: 0,
      replay_count: 0,
    });
    room_id = docRef.id;
    amIhost.set(true);
    room_available.set(true);
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
      // check if the room is full
      if (data.users.length < 4) {
        // check if the user is already in the room
        // TODO: need to delete the user if they leave
        if (userList.includes($currentUser.user.uid)) {
          console.log("You already joined this room before!");
        } else {
          // add user to room
          userList.push($currentUser.user.uid);
          await updateDoc(roomRef, { users: userList });
        }
        // successfully joined room
        console.log("Can join room now!");
        amIhost.set(false);
        room_available.set(true);
      } else {
        // Room is full, stop the request
        alert("Room is currently full");
        room_available.set(false);
      }
      // amIhost.set(false);
    } else {
      alert("Not found");
      room_available.set(false);
    }
  }
</script>

<main>
  {#if !$room_available}
    <div class="maincontainer">
      <h1>MaiGO</h1>
      <button on:click={() => createRoom()}>Create Room</button>
      <input bind:value={room_id} />
      <br/>
      <button on:click={() => {
        if (room_id!='') joinExistingRoom(room_id)
        }}>Join Room</button>
      <p>
        A GeoGeussr Clone for Online Multiplayer
        <br/>
        HHLAB is a group of students from Keio University, Japan.
      </p>
      <button
        on:click = {() => {
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
    </div>
  {:else}
    <Room {room_id} />
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

  .maincontainer {
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    padding: 1em;
    margin: 0 auto;
    width:25em;
    height:30em;
    /* add glass effect */
		background: rgba( 255, 255, 255, 0.15 );
		box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
		backdrop-filter: blur( 4.5px );
		-webkit-backdrop-filter: blur( 4.5px );
		border-radius: 10px;
		border: 1px solid rgba( 255, 255, 255, 0.18 );
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
    color:white;
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }

    p {
      max-width: none;
    }
  }
button {
  background-color: white;
  border: none;
  color: #006633;
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
