<script setup lang="ts">
    import Card from '../components/Card.vue';
</script>

<template>
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <Card>
      <slot name="main"></slot>
    </Card>
  </main>
</template>