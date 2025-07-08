<template>
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <div class="bg-white p-8 rounded-lg m-auto shadow-sm w-11/12 md:w-176 mt-20 mb-20">
      <slot name="main"></slot>
    </div>
  </main>
</template>