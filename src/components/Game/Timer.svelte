<script lang="ts">
	import { doc, getDoc } from "firebase/firestore";
	import { onMount } from "svelte";
    import { db } from "../../../firebase";
	export let room_id: string;

	let endTime;
	
	const getEndTime = async () => {
		const roomRef = doc(db, "rooms", room_id);
		const docSnap = await getDoc(roomRef);
		if (docSnap.exists()) {
			let data = docSnap.data();
			endTime = data.endTime.toDate();
			console.log("endTime: ",data.endTime);
		}
	}

	onMount(() => {
		getEndTime();
	});
</script>

<div class="timer">Timer Component<br>Fetched endTime:<br>{endTime}</div>

<style>
	.timer {
		position: absolute;
		background-color: red;
		width:20%;
		height: 10%;
		z-index: 0;
		/* margin-left: -30px; */
	}
</style>