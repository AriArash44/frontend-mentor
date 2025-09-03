<script lang="ts">
    import Modal from "$lib/components/modal.svelte";
    import Carousel from "$lib/components/carousel.svelte";
    import Thumbnail from "$lib/components/thumbnail.svelte";
    import { modalIsOpen, cartNumber } from '$lib/store';
    let index = 0;
    let productNumber = 0;
    const productImages = ["/images/product-1.jpg", "/images/product-2.jpg", "/images/product-3.jpg", "/images/product-4.jpg"];
    const thumbnailImages = ["/images/product-1-thumbnail.jpg", "/images/product-2-thumbnail.jpg", "/images/product-3-thumbnail.jpg", "/images/product-4-thumbnail.jpg"];
</script>

<button class="hidden md:block p-4 border-1 m-4" onclick={() => modalIsOpen.set(true)}>TEMP OPEN MODAL</button>
<Modal>
    <Carousel bind:index images={productImages} />
    <Thumbnail bind:index images={thumbnailImages} />
</Modal>
<div class="flex items-center justify-center gap-2">
    <div class="flex items-center justify-center bg-light-grayish-blue rounded-lg w-1/3 h-12">
        <button class="w-1/4 cursor-pointer" onclick={() => {productNumber += 1;}}>
            <img class="m-auto" src="/icons/plus.svg" alt="increase" />
        </button>
        <p class="w-1/2 text-center">{productNumber}</p>
        <button class="w-1/4 cursor-pointer" onclick={() => {productNumber = Math.max(productNumber - 1, 0)}}>
            <img class="m-auto" src="/icons/minus.svg" alt="increase" />
        </button>
    </div>
    <button class="w-2/3 h-12 cursor-pointer flex justify-center items-center gap-2 bg-c-orange hover:bg-c-pale-orange rounded-lg"
        onclick={() => {cartNumber.set(productNumber)}}>
        <img src="/icons/BCart.svg" alt="cart" />
        <p class="font-bold text-very-dark-blue-grayish">Add to Cart</p>
    </button>
</div>