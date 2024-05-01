<template>
  <div class="flex flex-col gap-6 items-center justify-center w-full h-auto">
    <font-awesome-icon
      icon="flask"
      class="fa-10x" />

    <Button
      label="Toss into volcano"
      @click="handleTossFlask" />
  </div>
</template>

<script setup>
const emits = defineEmits(['tossFlask']);

function handleTossFlask() {
  emits('tossFlask', true);
}
</script>

<style scoped></style>
