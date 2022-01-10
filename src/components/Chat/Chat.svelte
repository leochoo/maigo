<script>
  import Message from "./Message.svelte";
  import { currentUser } from "./../../store.js";
  import { db } from "../../../firebase";
  import { doc, addDoc, collection, orderBy, onSnapshot, query, getDoc } from "firebase/firestore";

  export let room_id;

  let _currentUser = null;
  // fetch user data from store.js
  currentUser.subscribe((value) => {
    _currentUser = value.user;
    value.user.displayNmae = "dfsfd"
  });

  let message = "";
  let chatList = [];

  // fetch all messages from firestore
  const q = query(collection(db, `chats/${room_id}/messages`), orderBy("timestamp", "asc"));
  const unsub = onSnapshot(
          q,
          (snapshot) => {
            console.log(snapshot);
            chatList = [];
            snapshot.forEach((doc) => {
              chatList.push(doc.data());
              console.log(doc.data());
            });
          }
  )

  // add message to chats field in rooms doc
  async function handleClick() {
    if (message !== "") {
      
      const userId = _currentUser.uid;
      let userName;
      const userInfoRef = doc(db, "users", userId); 
      await getDoc(userInfoRef).then((userDoc) => {
        userName = userDoc.data().displayName
      });
      const userPhoto = _currentUser.photoURL;

      const docRef = await addDoc(collection(db, `chats/${room_id}/messages`), {
        roomId: room_id,
        timestamp: new Date(),
        uid: userId,
        userName: userName,
        userPhoto: userPhoto,
        message: message,
      });
      message = "";
    }
  }

  // chats/{chat-id}/messages/{id} - make subcollection
</script>

<main>
  <p>CHAT</p>
  <template>
    I am {_currentUser.displayName}
    <ul>
      {#each chatList as chat}
        <Message
          uid={chat.uid}
          name={chat.userName}
          photoURL= {chat.userPhoto}
          message={chat.message}
          self={_currentUser.uid === chat.uid}
        />
      {/each}
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
