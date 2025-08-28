<script lang="ts">
    import Modal from "$lib/components/modal.svelte";
    import Carousel from "$lib/components/carousel.svelte";
    let index = 0;
</script>


<Modal>
    <Carousel bind:index images={["/images/product-1.jpg", "/images/product-2.jpg", "/images/product-3.jpg", "/images/product-4.jpg"]} />
</Modal>