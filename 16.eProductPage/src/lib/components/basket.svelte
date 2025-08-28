<script lang="ts">
    export let basketIsOpen = false;
    export let cartNumber = 0;
    export let productName: string = "";
    export let price = 0.00;
</script>

{#if basketIsOpen}
    <div class="w-[20rem] h-[14rem] absolute flex flex-col bg-white shadow-2xl rounded-2xl">
        <p class="px-5 py-4 font-bold text-sm">Cart</p>
        <hr class="border-t border-grayish-blue mt-2"/>
        {#if cartNumber === 0}
            <p class="flex-1 flex justify-center items-center text-center text-dark-grayish-blue font-bold">Your cart is empty.</p>
        {:else}
            <div class="p-5 mt-0.5">
                <div class="flex justify-center items-center gap-3">
                    <img class="w-[18%] rounded" src="/images/product-1-thumbnail.jpg" alt="product" />
                    <div class="w-[80%]">
                        <p class="text-dark-grayish-blue text-sm">{productName}</p>
                        <p class="text-dark-grayish-blue text-sm mt-2">${price} x {cartNumber}
                            <span class="font-bold text-very-dark-blue">${cartNumber * price}</span>
                        </p>
                    </div>
                    <button class="cursor-pointer" on:click={() => {cartNumber = 0;}}>
                        <img src="/icons/delete.svg" alt="remove" />
                    </button>
                </div>
                <button class="w-full text-very-dark-blue bg-c-orange rounded mt-5 py-3 font-bold">Checkout</button>
            </div>
        {/if}
    </div>
{/if}