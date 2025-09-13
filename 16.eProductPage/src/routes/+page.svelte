<script lang="ts">
    import { onMount } from 'svelte';
    import Modal from "$lib/components/modal.svelte";
    import Carousel from "$lib/components/carousel.svelte";
    import Thumbnail from "$lib/components/thumbnail.svelte";
    import { modalIsOpen, cartNumber } from '$lib/store';
    let index = 0;
    let productNumber = 0;
    const productImages = ["/images/product-1.jpg", "/images/product-2.jpg", "/images/product-3.jpg", "/images/product-4.jpg"];
    const thumbnailImages = ["/images/product-1-thumbnail.jpg", "/images/product-2-thumbnail.jpg", "/images/product-3-thumbnail.jpg", "/images/product-4-thumbnail.jpg"];
    let isMdUp = false;
    onMount(() => {
        isMdUp = window.innerWidth >= 768;
        window.addEventListener('resize', () => {
            isMdUp = window.innerWidth >= 768;
        });
    });
</script>

<div class="w-full md:w-1/2 md:pt-3 flex flex-col gap-8">
    <Carousel bind:index images={productImages} on:click={() => {
        if (window.innerWidth >= 768) {
            modalIsOpen.set(true);
        }
    }} hasController="{!isMdUp}"/>
    <Thumbnail bind:index images={thumbnailImages} classes="w-full px-10 hidden md:flex gap-8"/>
</div>
<section aria-labelledby="product-title" aria-describedby="product-description" class="w-full md:w-1/2 flex flex-col justify-center items-start p-6 md:p-0">
    <p class="text-dark-grayish-blue font-mono tracking-widest font-semibold text-sm">SNEAKERS COMPANY</p>
    <h1 id="product-title" class="text-very-dark-blue font-bold leading-8 md:leading-12 mt-4">Fall Limited Edition Sneakers</h1>
    <p id="product-description" class="text-dark-grayish-blue mt-6 md:mt-10 text-base md:text-lg">These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.</p>
    <div class="flex md:flex-col justify-between gap-2 items-center md:items-start w-full">
        <div class="flex mt-6 md:mt-8 gap-4 items-baseline md:items-center">
            <h2 class="text-very-dark-blue font-bold leading-7">$125.00</h2>
            <p class="font-semibold text-white px-2 bg-very-dark-blue rounded">50%</p>
        </div>
        <p class="text-dark-grayish-blue font-bold line-through mt-6 md:mt-0">$250.00</p>
    </div>
    <div class="flex flex-col md:flex-row items-center justify-center gap-3 mt-8 w-full">
        <div class="flex items-center justify-center bg-light-grayish-blue rounded-lg w-full md:w-1/3 h-12">
            <button class="w-1/4 cursor-pointer p-2" onclick={() => {productNumber = Math.max(productNumber - 1, 0)}}>
                <img class="m-auto" src="/icons/minus.svg" alt="decrease" />
            </button>
            <p class="w-1/2 text-center font-semibold">{productNumber}</p>
            <button class="w-1/4 cursor-pointer p-2" onclick={() => {productNumber += 1;}}>
                <img class="m-auto" src="/icons/plus.svg" alt="increase" />
            </button>
        </div>
        <button class="w-full md:w-2/3 h-12 cursor-pointer flex justify-center items-center gap-2 bg-c-orange
        hover:bg-c-orange/60 rounded-lg shadow-c-orange/30 shadow-2xl" onclick={() => {cartNumber.set(productNumber)}}>
            <img src="/icons/BCart.svg" alt="cart" />
            <p class="font-bold text-very-dark-blue-grayish">Add to Cart</p>
        </button>
    </div>
</section>
<Modal>
    <Carousel bind:index images={productImages} />
    <Thumbnail bind:index images={thumbnailImages} />
</Modal>