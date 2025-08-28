<script lang="ts">
	import '../styles.css';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png">
	<title>Frontend mentor | 16.eProductPage</title>
</svelte:head>

{@render children?.()}
