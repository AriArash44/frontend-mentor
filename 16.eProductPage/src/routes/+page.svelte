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

<div class="w-full md:w-1/2">
    <Carousel bind:index images={productImages} on:click={() => modalIsOpen.set(true)} hasController="{false}"/>
    <br/>
    <Thumbnail bind:index images={thumbnailImages} classes="w-full px-12"/>
</div>
<div class="w-full md:w-1/2 flex flex-col justify-center items-start">
    <p class="text-dark-grayish-blue font-mono">SNEAKERS COMPANY</p>
    <h1 class="text-very-dark-blue font-bold leading-12 mt-3">Fall Limited Edition Sneakers</h1>
    <p class="text-dark-grayish-blue mt-8 text-lg">These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.</p>
    <div class="flex mt-4 gap-4">
        <h2 class="text-very-dark-blue font-bold">$125.00</h2>
        <p class="font-semibold text-white px-2 py-0.5 bg-very-dark-blue rounded">50%</p>
    </div>
    <p class="text-dark-grayish-blue font-bold line-through mt-2">$250.00</p>
    <div class="flex items-center justify-center gap-2 mt-8 w-full">
        <div class="flex items-center justify-center bg-light-grayish-blue rounded-lg w-1/3 h-12">
            <button class="w-1/4 cursor-pointer" onclick={() => {productNumber = Math.max(productNumber - 1, 0)}}>
                <img class="m-auto" src="/icons/minus.svg" alt="decrease" />
            </button>
            <p class="w-1/2 text-center">{productNumber}</p>
            <button class="w-1/4 cursor-pointer" onclick={() => {productNumber += 1;}}>
                <img class="m-auto" src="/icons/plus.svg" alt="increase" />
            </button>
        </div>
        <button class="w-2/3 h-12 cursor-pointer flex justify-center items-center gap-2 bg-c-orange hover:bg-c-pale-orange rounded-lg"
            onclick={() => {cartNumber.set(productNumber)}}>
            <img src="/icons/BCart.svg" alt="cart" />
            <p class="font-bold text-very-dark-blue-grayish">Add to Cart</p>
        </button>
    </div>
</div>
<Modal>
    <Carousel bind:index images={productImages} />
    <Thumbnail bind:index images={thumbnailImages} />
</Modal>