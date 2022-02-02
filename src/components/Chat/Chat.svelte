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
  <template>
    <br/>
    <br/>
    <div class="chatlistcontainer">
      <div id="mainChatList" class="chatlist">
        {#each chatList.reverse() as chat}
          <Message
            name={chat.userName}
            photoURL= {chat.userPhoto}
            message={chat.message}
            self={_currentUser.uid === chat.uid}
          />
        {/each}
      </div>
    </div>
    <form>
      <input
        bind:value={message}
        id="newMessageText"
        class="input"
        type="text"
        style="margin:0.5em"
      />
      <button on:click|preventDefault={handleClick} style="margin:0.5em"> Send </button>
    </form>
  </template>
</main>

<style>
  .chatlistcontainer {
    background: rgba( 255, 255, 255, 0.55 );
    padding:1em;
    border-radius: 1em;
  }
  .chatlist {
    width: 24em;
    height: 12em;
    overflow-y: scroll;
    display: flex;
    flex-direction: column-reverse;
  }
  button {
    background-color: rgb(0, 243, 12);
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