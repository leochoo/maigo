<script lan="ts">
    let shown = false;
    export function show(){
        shown = true;
    }
    export function hide(){
        shown = false;
    }
</script>
<style>
    .modal-wrapper {
        background-color: rgba(0,0,0,0.5);
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
    .modal {
        background-color: white;
        max-width: 50vw;
        padding: 1rem;
        margin: 15% auto;
    }
    .close{
        float: right;
        cursor: pointer;
    }
    .close:hover{
        font-weight: bold;
    }
</style>
{#if shown}
    <div class = "modal-wrapper">
        <div class = "modal" >
            <span class ="close" on:click={() => hide()}>&times;</span>
            <slot />
        </div>
    </div> 
{/if}