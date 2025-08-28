<script lang="ts">
    import Modal from "$lib/components/modal.svelte";
    import Carousel from "$lib/components/carousel.svelte";
    import Thumbnail from "$lib/components/thumbnail.svelte";
    import Aside from "$lib/components/aside.svelte";
    import { modalIsOpen } from '$lib/store';
    let index = 0;
    const productImages = ["/images/product-1.jpg", "/images/product-2.jpg", "/images/product-3.jpg", "/images/product-4.jpg"];
    const thumbnailImages = ["/images/product-1-thumbnail.jpg", "/images/product-2-thumbnail.jpg", "/images/product-3-thumbnail.jpg", "/images/product-4-thumbnail.jpg"];
    let asideIsOpen = false;
    const menuItems = ["Collections", "Men", "Women", "About", "Contact"];
</script>

<button class="hidden md:block p-4 border-1 m-4" on:click={() => modalIsOpen.set(true)}>TEMP OPEN MODAL</button>
<Modal>
    <Carousel bind:index images={productImages} />
    <Thumbnail bind:index images={thumbnailImages} />
</Modal>
{#if !asideIsOpen}
    <button class="cursor-pointer md:hidden m-4" on:click={() => asideIsOpen = true}>
        <img src="/icons/menu.svg" alt="menu" />
    </button>
{/if}
<Aside bind:asideIsOpen items={menuItems}/>