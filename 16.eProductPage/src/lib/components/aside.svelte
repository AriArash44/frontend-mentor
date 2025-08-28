<script lang="ts">
    export let asideIsOpen = false;
    export let items: string[] = [];
</script>

<div class={`fixed inset-0 w-screen h-screen bg-black transition-opacity duration-300 ${
        asideIsOpen ? 'opacity-75 pointer-events-auto' : 'opacity-0 pointer-events-none' }`}>
    <div class={`absolute top-0 left-0 h-full w-[15rem] bg-white p-6 transform transition-transform duration-300 ease-in-out ${
            asideIsOpen ? 'translate-x-0' : '-translate-x-full' }`}>
        <button class="mb-8 cursor-pointer" on:click={() => (asideIsOpen = false)}>
            <img src="/icons/close.svg" alt="close" />
        </button>
        {#each items as item}
            <p class="font-bold text-lg mt-4 cursor-pointer text-very-dark-blue">{item}</p>
        {/each}
    </div>
</div>
