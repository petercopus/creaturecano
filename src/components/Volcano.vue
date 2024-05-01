<template>
  <div class="flex flex-col gap-6 items-center justify-between w-full h-auto">
    <font-awesome-icon
      icon="volcano"
      class="fa-10x" />

    <Button
      label="Collect Creation"
      @click="handleCollectCreation" />
  </div>
</template>

<script setup>
const emits = defineEmits(['collectCreation']);

function handleCollectCreation() {
  emits('collectCreation', true);
}
</script>

<style scoped></style>
