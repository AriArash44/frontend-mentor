<script lang="ts">
    export let images: string[] = [];
    export let index = 0;
</script>

<div class="flex items-center w-2/3 m-auto gap-4">
    {#each images as img, i}
        <button class={`cursor-pointer bg-white rounded-xl overflow-clip ${index === i ? 'border-2 border-c-orange' : ''}`} on:click={() => {index = i}}>
            <img class={`hover:opacity-70 ${index === i ? 'opacity-40' : ''}`} src={img} alt={`product-img-${i}`} />
        </button>
    {/each}
</div>