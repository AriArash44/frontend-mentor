<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    export let images: string[] = [];
    export let index = 0;
    export let hasController = true;
    let prevSrc = '/icons/previous.svg';
    let nextSrc = '/icons/next.svg';
    function changeIndex(step: number) {
        index = Math.min(Math.max(index + step, 0), images.length - 1);
    }
    const setHoverState = (isHover: boolean, type: 'prev' | 'next') => {
        if (type === 'prev') {
            prevSrc = isHover ? '/icons/OPrevious.svg' : '/icons/previous.svg';
        } else {
            nextSrc = isHover ? '/icons/ONext.svg' : '/icons/next.svg';
        }
    };
    const dispatch = createEventDispatcher();
    function handleClick() {
        dispatch('click');
    }
</script>

<div class="flex items-center md:cursor-pointer" role="button" on:click={handleClick} on:keydown={(e) => e.key === 'Enter' && handleClick()} tabindex="0">
    <button
        class={"bg-white rounded-full py-4 px-[1.2rem] translate-x-6 cursor-pointer z-10 absolute md:static" + (index === 0 || !hasController ? " invisible" : "")}
        aria-label="Previous"
        on:click={() => changeIndex(-1)}
        on:mouseover={() => setHoverState(true, 'prev')}
        on:mouseout={() => setHoverState(false, 'prev')}
        on:focus={() => setHoverState(true, 'prev')}
        on:blur={() => setHoverState(false, 'prev')}
    >
        <img src={prevSrc} alt="prev" />
    </button>
    <div class="relative w-full overflow-hidden">
        <div
            class="flex transition-transform duration-500 ease-in-out"
            style={`transform: translateX(-${index * 100}%);`}
        >
            {#each images as img, i}
                <img src={img} alt={`product-img-${i}`} class="w-full flex-shrink-0 md:rounded-2xl" />
            {/each}
        </div>
    </div>
    <button
        class={"bg-white rounded-full py-4 px-[1.15rem] translate-x-[-1.5rem] cursor-pointer z-10 absolute right-0 md:static" + (index === images.length - 1 || !hasController ? " invisible" : "")}
        aria-label="Next"
        on:click={() => changeIndex(1)}
        on:mouseover={() => setHoverState(true, 'next')}
        on:mouseout={() => setHoverState(false, 'next')}
        on:focus={() => setHoverState(true, 'next')}
        on:blur={() => setHoverState(false, 'next')}
    >
        <img src={nextSrc} alt="next" />
    </button>
</div>
