<script lang="ts">
	import favicon from '/favicon-32x32.png';
	import '../styles.css';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Frontend mentor | 16.eProductPage</title>
</svelte:head>

{@render children?.()}
