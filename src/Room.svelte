<script lang="ts">
  import { db } from "../firebase"
  import { doc, setDoc, onSnapshot } from "firebase/firestore";
  import { onMount } from "svelte";
  import { dataset_dev } from "svelte/internal";
  let data:any = [];
  export let room_id:string;
  const unsub = onSnapshot(doc(db, "rooms", room_id), (doc) => {
      console.log("Current data: ", doc.data());
      data = doc.data();
  });
  
</script>

<li>{data.user1}</li>
<li>{data.user2}</li>
<li>{data.user3}</li>
<li>{data.user4}</li>