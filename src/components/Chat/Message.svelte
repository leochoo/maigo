<script lang="ts">
    export let uid: string;
    export let name: string;
    export let photoURL: string;

    export let message: string;

    export let self = false;
</script>

{#if self}
    <div style="background-color: #ddd; display: flex;">
        <img src={photoURL} width="16" height="16" />
        <h4>{name}</h4>
        <p>{message}</p>
    </div>
{:else}
    <div style="background-color: #fff; display: flex;">
        <img src={photoURL} width="16" height="16" />
        <h4>{name}</h4>
        <p>{message}</p>
    </div>
{/if}