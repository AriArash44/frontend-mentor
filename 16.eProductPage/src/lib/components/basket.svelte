<script lang="ts">
    import { browser } from '$app/environment';
    import { onMount, onDestroy } from 'svelte';
    import { cartNumber } from "$lib/store";
    export let basketIsOpen = false;
    export let productName: string = "";
    export let price = 0.00;
    let cartRef: HTMLDivElement | null = null;
    onMount(() => {
        if (browser) {
            const handleClickOutside = (event: MouseEvent) => {
                if (basketIsOpen && cartRef && !cartRef.contains(event.target as Node)) {
                    basketIsOpen = false;
                }
            };
            document.addEventListener('click', handleClickOutside);
            onDestroy(() => {
                document.removeEventListener('click', handleClickOutside);
            });
        }
    });
</script>

{#if basketIsOpen}
    <div class="w-[20rem] h-[14rem] absolute right-2 xl:right-[calc((100vw-1330px)/2)] 
    top-18 md:top-16 flex flex-col bg-white shadow-2xl rounded-2xl z-100" bind:this={cartRef}>
        <p class="px-5 py-4 font-bold text-sm">Cart</p>
        <hr class="border-t border-c-light-grayish-blue mt-2"/>
        {#if $cartNumber === 0}
            <p class="flex-1 flex justify-center items-center text-center text-dark-grayish-blue font-bold">
                Your cart is empty.
            </p>
        {:else}
            <div class="p-5 mt-0.5">
                <div class="flex justify-center items-center gap-3">
                    <img class="w-[18%] rounded" src="/images/product-1-thumbnail.jpg" alt="product" />
                    <div class="w-[80%]">
                        <p class="text-dark-grayish-blue text-sm">{productName}</p>
                        <p class="text-dark-grayish-blue text-sm mt-2">${price.toFixed(2)} x {$cartNumber}
                            <span class="font-bold text-very-dark-blue">${($cartNumber * price).toFixed(2)}</span>
                        </p>
                    </div>
                    <button class="cursor-pointer" onclick={() => {cartNumber.set(0)}}>
                        <img src="/icons/delete.svg" alt="remove" />
                    </button>
                </div>
                <button class="w-full text-very-dark-blue bg-c-orange rounded mt-5 py-3 
                cursor-pointer hover:bg-c-orange/60 font-bold">Checkout</button>
            </div>
        {/if}
    </div>
{/if}