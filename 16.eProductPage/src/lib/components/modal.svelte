<script lang="ts">
    import { modalIsOpen } from '$lib/store';
    let iconSrc = '/icons/close.svg';
    function setHoverState(isHover: boolean) {
        iconSrc = isHover ? '/icons/OClose.svg' : '/icons/close.svg';
    }
</script>

{#if $modalIsOpen}
    <div class="bg-black/75 fixed inset-0 w-screen h-screen flex justify-center items-center">
        <div class="w-1/3 relative flex flex-col gap-8">
            <button
                class="cursor-pointer mr-10" dir="rtl"
                aria-label="Close modal"
                on:click={() => modalIsOpen.set(false)}
                on:mouseover={() => setHoverState(true)}
                on:mouseout={() => setHoverState(false)}
                on:focus={() => setHoverState(true)}
                on:blur={() => setHoverState(false)}
            >
                <img src={iconSrc} alt="close"/>
            </button>
            <slot />
        </div>
    </div>
{/if}
