<script lang="ts">
    import { modalIsOpen } from '$lib/store';
    let iconSrc = '/icons/close.svg';

    function setHoverState(isHover: boolean) {
        iconSrc = isHover ? '/icons/OClose.svg' : '/icons/close.svg';
    }
</script>

{#if $modalIsOpen}
    <div class="bg-black opacity-75 fixed inset-0 w-full h-full flex justify-center items-center">
        <button
            class="cursor-pointer"
            aria-label="Close modal"
            on:click={() => modalIsOpen.set(false)}
            on:mouseover={() => setHoverState(true)}
            on:mouseout={() => setHoverState(false)}
            on:focus={() => setHoverState(true)}
            on:blur={() => setHoverState(false)}
        >
            <img src={iconSrc} alt="close" />
        </button>
        <slot />
    </div>
{/if}
