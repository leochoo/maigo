<script lang="ts">
	import { doc, getDoc } from "firebase/firestore";
	import { onDestroy, onMount } from "svelte";
    import { db } from "../../../firebase";
	import { Tweened, tweened } from 'svelte/motion';
	export let room_id: string;

	let remainingTime: number;
	let timer: Tweened<number>;
	let timerId: NodeJS.Timer;
	$:minutes=5;
	$:seconds=0;
	
	// fetch endTime in firestore
	const getEndTime = async () => {
		const roomRef = doc(db, "rooms", room_id);
		const docSnap = await getDoc(roomRef);
		if (docSnap.exists()) {
			let data = docSnap.data();
			return new Date(data.endTime.toDate()).getTime();
		}
	}

	const calRemainingTime = async () => {
		const endTime = await getEndTime();

		// get the current time when a game started
		const currUTCTime = await fetch("http://worldtimeapi.org/api/timezone/Etc/UTC");
		const data = await currUTCTime.json();
		const currTime = new Date(data.datetime).getTime();

		// diff between endTime and the current time
		remainingTime = (endTime - currTime)*0.001;
		console.log("remaining Time: ",remainingTime);
		timer = tweened(remainingTime);
	}

	const tick = () => {
		if($timer > 0){
			minutes = Math.floor($timer/60);
			seconds = Math.floor($timer - minutes * 60);
			$timer--;
		}else{
			console.log("timer done")
			return
		}
		console.log("tick: ",$timer);
	}

	onMount(async () => {
		await calRemainingTime();
		timerId = setInterval(()=>tick(),1000)
	})

	onDestroy(()=>{
		clearInterval(timerId);
	})
</script>

<div class="timer">
	{minutes} : {seconds.toString().padStart(2, "0")}
</div>

<style>
	.timer {
		position: absolute;
		background-color: black;
		width:18%;
		height: 10%;
		z-index: 0;
		font-size: 4rem;
		text-align: left;
		margin-left: -80%;
		margin-top: -2%;
		color:#F32500;
	}
</style>