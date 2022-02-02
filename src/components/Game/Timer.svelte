<script lang="ts">
	import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
	import { onDestroy, onMount } from "svelte";
    import { db } from "../../../firebase";
	import {　currentUser } from "../../store";
	import { Tweened, tweened } from 'svelte/motion';
	export let room_id: string;

	let remainingTime: number;
	let timer: Tweened<number>;
	let timerId: NodeJS.Timer;
	$:minutes=5;
	$:seconds=0;
	// fetch endTime in firestore
	const getStartEndTime = async () => {
		const roomRef = doc(db, "rooms", room_id);
		const docSnap = await getDoc(roomRef);
		if (docSnap.exists()) {
			let data = docSnap.data();
			return [
				new Date(data.startTime.toDate()).getTime(),
				new Date(data.endTime.toDate()).getTime()
			]
		}
	}

	const calRemainingTime = async () => {
		const startEndTime = await getStartEndTime();

		// diff between the endTime and the current time
		remainingTime = (startEndTime[1] - startEndTime[0])*0.001;
		console.log("remaining Timeeee: ",remainingTime);
		timer = tweened(remainingTime);
	}

	const tick = async () => {
		if($timer > 0){
			minutes = Math.floor($timer/60);
			seconds = Math.floor($timer - minutes * 60);
			$timer--;
		}else{
			console.log("time's up");
			const userRef = doc(db, "users", $currentUser.user.uid);
				await updateDoc(userRef, {
				score: 0
				})
			const docRef = doc(db, "rooms", room_id);
				await updateDoc(docRef, {
				submit_count: increment(1)
				});
		}
	}

	onMount(async () => {
		await calRemainingTime();
		timerId = setInterval(()=>tick(),1000)
	})

	onDestroy(()=>{
		clearInterval(timerId);
		console.log("onDestory")
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