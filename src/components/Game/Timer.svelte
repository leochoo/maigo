<script lang="ts">
	import { doc, getDoc } from "firebase/firestore";
	import { onMount } from "svelte";
    import { db } from "../../../firebase";
	export let room_id: string;

	let endTime:number;
	
	const getEndTime = async () => {
		const roomRef = doc(db, "rooms", room_id);
		const docSnap = await getDoc(roomRef);
		// set time limits
		const timeLimits = 300;
		if (docSnap.exists()) {
			let data = docSnap.data();
			endTime = data.endTime.seconds + timeLimits;
			console.log("endTime: ",data.endTime);
		}
		console.log("getEndTime End");
	}

	const calTimeLeft = () => {
		var startDate = new Date();
		// Do your operations
		endTime = endTime - startDate.getTime()/1000;
		console.log("calTimeLeft End");
	}

	onMount(async () => {
		console.log("Timer onMount");
		await getEndTime();
		calTimeLeft();
	});
</script>

<div class="timer">
	Timer Component<br>
	Fetched endTime:<br>
	{endTime} seconds
</div>

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