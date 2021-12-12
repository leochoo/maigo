<script lang="ts">
	import { doc, getDoc } from "firebase/firestore";
	import { onDestroy, onMount } from "svelte";
    import { db } from "../../../firebase";
	import { tweened } from 'svelte/motion'
	export let room_id: string;

	// let endTime:number;
	let remainingTime;
	let timer;
	let timerId;
	$:minutes=5;
	$:seconds=0;
	
	const getEndTime = async () => {
		const roomRef = doc(db, "rooms", room_id);
		const docSnap = await getDoc(roomRef);
		if (docSnap.exists()) {
			let data = docSnap.data();
			console.log("original endTime: ", data.endTime);
			console.log("fetched endTime: ",new Date(data.endTime.toDate()).getTime());
			return new Date(data.endTime.toDate()).getTime();
		}
	}

	const calRemainingTime = async () => {
		let endTime = await getEndTime();
		// TODO: change to UTC time
		let currTime = new Date().getTime();
		remainingTime = (endTime - currTime)/1000;
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
		console.log("in tick: ",$timer);

		
		// minutes = Math.floor($timer/60);
		// seconds = Math.floor($timer - minutes * 60);
		// if($timer > 0) $timer--;
		// console.log($timer);
	}

	onMount(async () => {
		console.log("in timer onMount");

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