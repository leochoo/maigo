<script lang="ts">
  import Game from "./Game/Game.svelte";
  import Chat from "./Chat/Chat.svelte";

  export let room_id: string;
</script>

<Chat />
<Game {room_id} />
