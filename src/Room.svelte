<script lang="ts">
  import { db } from "../firebase"
  import { doc, setDoc, onSnapshot } from "firebase/firestore";
  import { onMount } from "svelte";
  import { dataset_dev } from "svelte/internal";
  let data:any = [];
  const unsub = onSnapshot(doc(db, "rooms", "TzbWnXw0Ss6pGqqOQ6DW"), (doc) => {
      console.log("Current data: ", doc.data());
      data = doc.data();
  });
  
</script>

<li>{data.user1}</li>
<li>{data.user2}</li>
<li>{data.user3}</li>
<li>{data.user4}</li>