<script lang="ts">
    export let uid: string;
    export let name: string;
    export let photoURL: string;

    export let message: string;

    export let self = false;
</script>

{#if self}
    <div style="background-color: #ddd;" class="message">
        <img src={photoURL} style="width:2em;height:2em" alt="" />
        <p class="content"><b>{name}:</b><br/>{message}</p>
    </div>
{:else}
    <div style="background-color: #fff;" class="message">
        <img src={photoURL} style="width:2em;height:2em" alt="" />
        <p class="content">{name}<br/>{message}</p>
    </div>
{/if}

<style>
    .message {
        display:flex;
    }
    .content{
        padding-left: 1em;
        padding-right: 1em;
        word-wrap: break-word;
        text-align: left;
    }
</style>