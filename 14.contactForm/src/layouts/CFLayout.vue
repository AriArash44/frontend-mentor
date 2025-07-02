<script setup>
    import Card from '../components/Card.vue';
</script>

<template>
  <Card>
    <header class="d-flex bg-white justify-content-between align-items-center p-3
    border-grey-border border-bottom">
        <img src="/images/achareh.svg" alt="achareh Icon">
        <nav class="d-flex gap-3">
        <slot name="nav"></slot>
        </nav>
    </header>
    <main class="d-flex flex-column justify-content-center align-items-center 
    min-vh-75 overflow-y-scroll overflow-x-hidden mt-4 position-relative">
        <slot name="main"></slot>
    </main>
  </Card>
</template>