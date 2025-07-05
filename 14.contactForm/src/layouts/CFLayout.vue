<template>
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <div class="bg-white p-6 rounded-lg m-auto shadow-sm w-11/12 md:w-176">
      <slot name="main"></slot>
    </div>
  </main>
</template>