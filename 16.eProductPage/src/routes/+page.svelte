<script lang="ts">
    import Modal from "$lib/components/modal.svelte";
    import Carousel from "$lib/components/carousel.svelte";
    import Thumbnail from "$lib/components/thumbnail.svelte";
    import Aside from "$lib/components/aside.svelte";
    import Basket from "$lib/components/basket.svelte";
    import { modalIsOpen } from '$lib/store';
    let index = 0;
    const productImages = ["/images/product-1.jpg", "/images/product-2.jpg", "/images/product-3.jpg", "/images/product-4.jpg"];
    const thumbnailImages = ["/images/product-1-thumbnail.jpg", "/images/product-2-thumbnail.jpg", "/images/product-3-thumbnail.jpg", "/images/product-4-thumbnail.jpg"];
    let asideIsOpen = false;
    const menuItems = ["Collections", "Men", "Women", "About", "Contact"];
    let basketIsOpen = false;
    let productNumber = 0, cartNumber = 0;
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
<button class="relative cursor-pointer" on:click={() => {basketIsOpen = !basketIsOpen}}>
    {#if cartNumber !== 0}
        <p class="text-white bg-c-orange px-1.5 text-[8px] rounded-full absolute top-[-4px] right-[-4px]">{cartNumber}</p>
    {/if}
    <img src="/icons/cart.svg" alt="cart" />
</button>
<Basket basketIsOpen={basketIsOpen} bind:cartNumber productName="Fall Limited Edition Sneakers" price={125.00}/>
<div class="flex items-center justify-center gap-2">
    <div class="flex items-center justify-center bg-light-grayish-blue rounded-lg w-1/3 h-12">
        <button class="w-1/4 cursor-pointer" on:click={() => {productNumber = productNumber + 1;}}>
            <img class="m-auto" src="/icons/plus.svg" alt="increase" />
        </button>
        <p class="w-1/2 text-center">{productNumber}</p>
        <button class="w-1/4 cursor-pointer" on:click={() => {productNumber = Math.max(productNumber - 1, 0);}}>
            <img class="m-auto" src="/icons/minus.svg" alt="increase" />
        </button>
    </div>
    <button class="w-2/3 h-12 cursor-pointer flex justify-center items-center gap-2 bg-c-orange rounded-lg"
        on:click={() => {cartNumber = productNumber;}}>
        <img src="/icons/cart.svg" alt="cart" />
        <p class="font-bold text-very-dark-blue-grayish">Add to Cart</p>
    </button>
</div>