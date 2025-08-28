<script lang="ts">
    export let images: string[] = [];
    export let index = 0;
    let direction: 'next' | 'prev' = 'next';
    function prev() {
        direction = 'prev';
        index = Math.max(index - 1, 0);
    }
    function next() {
        direction = 'next';
        index = Math.min(index + 1, images.length - 1);
    }
</script>

<div class="flex items-center">
    <button class="bg-white rounded-full py-4 px-[1.2rem] translate-x-6 cursor-pointer z-10" on:click={prev} >
        <img src="/icons/previous.svg" alt="prev" />
    </button>
    <div class="relative w-full overflow-hidden">
        <div class="flex transition-transform duration-500 ease-in-out" style={`transform: translateX(-${index * 100}%);`} >
            {#each images as img, i}
                <img src={img} alt={`product-img-${i}`} class="w-full flex-shrink-0 rounded-2xl" />
            {/each}
        </div>
    </div>
    <button class="bg-white rounded-full py-4 px-[1.15rem] translate-x-[-1.5rem] cursor-pointer z-10" on:click={next} >
        <img src="/icons/next.svg" alt="next" />
    </button>
</div>