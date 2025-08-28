<script lang="ts">
    import Modal from "$lib/components/modal.svelte";
    import Carousel from "$lib/components/carousel.svelte";
    import Thumbnail from "$lib/components/thumbnail.svelte";
    let index = 0;
    const productImages = ["/images/product-1.jpg", "/images/product-2.jpg", "/images/product-3.jpg", "/images/product-4.jpg"];
    const thumbnailImages = ["/images/product-1-thumbnail.jpg", "/images/product-2-thumbnail.jpg", "/images/product-3-thumbnail.jpg", "/images/product-4-thumbnail.jpg"];
</script>


<Modal>
    <Carousel bind:index images={productImages} />
    <Thumbnail bind:index images={thumbnailImages} />
</Modal>