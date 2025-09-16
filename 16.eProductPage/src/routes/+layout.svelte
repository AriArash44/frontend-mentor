<script lang="ts">
	import '../styles.css';
	import Aside from "$lib/components/aside.svelte";
	import Basket from "$lib/components/basket.svelte";
	import { cartNumber } from '$lib/store';
	import {base} from '$app/paths';
	let { children } = $props();
	let asideIsOpen = $state(false);
	const menuItems = ["Collections", "Men", "Women", "About", "Contact"];
	let basketIsOpen = $state(false);
</script>

<svelte:head>
	<link rel="icon" href="{base}/favicon-32x32.png" sizes="32x32" type="image/png">
	<title>Frontend mentor | 16.eProductPage</title>
</svelte:head>

<header class="flex justify-between items-center px-4 md:px-10 xl:px-0 xl:w-6xl mx-auto md:border-b border-c-light-grayish-blue">
	<div class="flex items-center">
		<button class="cursor-pointer md:hidden m-3 h-6 w-6 mt-4" onclick={() => asideIsOpen = true}>
			<img src="{base}/icons/menu.svg" alt="menu" />
		</button>
		<Aside bind:asideIsOpen items={menuItems}/>
		<img src="{base}/icons/logo.svg" alt="SNEAKERS" class="w-32 h-5 mr-8 md:mb-4 md:mt-3"/>
		<nav class="hidden md:flex gap-4 h-full">
			{#each menuItems as menuItem}
				<p class="flex items-end h-full text-dark-grayish-blue cursor-pointer hover:text-black hover:font-semibold 
				font-medium pb-10 mt-10 border-b-3 border-transparent hover:border-c-orange translate-[1px]">
					{menuItem}
				</p>
			{/each}
		</nav>
	</div>
	<div class="flex gap-6">
		<Basket bind:basketIsOpen productName="Fall Limited Edition Sneakers" price={125.00}/>
		<button class="cursor-pointer" onclick={(e) => {e.stopPropagation(); basketIsOpen = !basketIsOpen}}>
			{#if $cartNumber !== 0}
				<p class="text-c-pale-orange bg-c-orange px-1.5 text-[8px] rounded-full absolute mt-[-4px] ml-[10px] z-10">{$cartNumber}</p>
			{/if}
			<img src="{base}/icons/cart.svg" alt="cart" onmouseenter={(e: MouseEvent) => {
    			(e.currentTarget as HTMLImageElement).src = `${base}/icons/BCart.svg`;
  			}} onmouseleave={(e: MouseEvent) => {
    			(e.currentTarget as HTMLImageElement).src = `${base}/icons/cart.svg`;
  			}}/>
		</button>
		<img class="w-8 h-8 md:w-12 md:h-12 cursor-pointer rounded-full hover:border-2 hover:border-c-orange" src="{base}/images/avatar.png" alt="avater" />
	</div>
</header>
<main class="mx-auto xl:w-6xl flex flex-col md:flex-row md:p-6 md:py-16 md:gap-16">
	{@render children?.()}
</main>
