<template>
  <div class="filter flex flex-row items-center justify-between pb-5">
    <div class="w-2/3 flex flex-row items-center">
        <slot name="left"></slot>
    </div>
    <div class="tools">
        <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>
