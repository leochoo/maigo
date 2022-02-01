<script lang="ts">
    // export let uid: string;
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
        margin:0.5em;
        border-radius:0.5em;
        padding:0em;
        color: black;
    }
    .content{
        padding-left: 1em;
        padding-right: 1em;
        padding-top: 0.25em;
        padding-bottom: 0.25em;
        inline-size:400px;
        overflow-wrap: break-word;
        text-align: left;
        color: black;
    }
</style>