<script>
  import { currentUser } from "./../../store.js";
  import { db } from "../../../firebase";

  export let room_id;

  let _currentUser = null;
  // fetch user data from store.js
  currentUser.subscribe((value) => {
    _currentUser = value.user;
  });

  let message = "";

  // fetch all messages from firestore

  // add message to chats field in rooms doc
  function handleClick() {
    const userId = _currentUser.uid;
    const userName = _currentUser.displayName;
    const userPhoto = _currentUser.photoURL;

    const messageObj = {
      message,
      userId,
      userName,
      userPhoto,
      createdAt: new Date(),
    };
  }

  // chats/{chat-id}/messages/{id} - make subcollection
</script>

<main>
  <p>CHAT</p>
  <template>
    I am {_currentUser.displayName}
    <ul>
      <li>Chat 1</li>
      <li>Chat 2</li>
      <li>Chat 3</li>
    </ul>
    <form>
      <input
        bind:value={message}
        id="newMessageText"
        class="input"
        type="text"
      />
      <button on:click|preventDefault={handleClick}> Send </button>
    </form>
  </template>
</main>
