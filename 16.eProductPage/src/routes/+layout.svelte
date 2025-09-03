<script lang="ts">
	import '../styles.css';
	import Aside from "$lib/components/aside.svelte";
	import Basket from "$lib/components/basket.svelte";
	import { cartNumber } from '$lib/store';
	let { children } = $props();
	let asideIsOpen = $state(false);
    const menuItems = ["Collections", "Men", "Women", "About", "Contact"];
	let basketIsOpen = $state(false);
</script>

<svelte:head>
	<link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png">
	<title>Frontend mentor | 16.eProductPage</title>
</svelte:head>

<header class="flex justify-around">
	<div class="flex gap-3">
		{#if !asideIsOpen}
			<button class="cursor-pointer md:hidden m-4" onclick={() => asideIsOpen = true}>
				<img src="/icons/menu.svg" alt="menu" />
			</button>
		{/if}
		<Aside bind:asideIsOpen items={menuItems}/>
		<img src="/icons/logo.svg" alt="SNEAKERS" class="w-36 h-10"/>
		<nav class="hidden md:flex gap-4">
			{#each menuItems as menuItem}
				<p>{menuItem}</p>
			{/each}
		</nav>
	</div>
	<div class="flex">
		<Basket basketIsOpen={basketIsOpen} productName="Fall Limited Edition Sneakers" price={125.00}/>
		<button class="cursor-pointer" onclick={() => {basketIsOpen = !basketIsOpen}}>
			{#if $cartNumber !== 0}
				<p class="text-white bg-c-orange px-1.5 text-[8px] rounded-full absolute mt-[-4px] ml-[10px] z-10">{cartNumber}</p>
			{/if}
			<img src="/icons/cart.svg" alt="cart" />
		</button>
		<img src="/images/avatar.png" alt="avater" />
	</div>
</header>
<main>
	{@render children?.()}
</main>
