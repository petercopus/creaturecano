<template>
  <!-- 
    Not my favorite code here
    Would have liked to have extended it to handle n number of ingredients...
    But, should be able to be adjusted in the future
  -->
  <div class="flex flex-col gap-6 w-full">
    <div
      v-if="ingredients.length >= 1"
      class="flex gap-3 items-center">
      <Card
        v-if="ingredients.length >= 1"
        class="w-48 h-48 bg-ashgray bg-opacity-10">
        <template #content>
          <div class="flex flex-col items-center justify-center gap-2">
            <font-awesome-icon
              class="fa-3x"
              :icon="ingredients[0].icon" />

            <label class="mt-5 font-semibold">
              {{ ingredients[0].name }}
            </label>
          </div>
        </template>
      </Card>
      <font-awesome-icon icon="plus" />
      <Card
        v-if="ingredients.length == 2"
        class="w-48 h-48 bg-ashgray bg-opacity-10">
        <template #content>
          <div class="flex flex-col items-center justify-center gap-2">
            <font-awesome-icon
              class="fa-3x"
              :icon="ingredients[1].icon" />

            <label class="mt-5 font-semibold">
              {{ ingredients[1].name }}
            </label>
          </div>
        </template>
      </Card>
    </div>
    <Button
      v-if="ingredients.length == 2"
      label="Add to Flask"
      @click="handleAddToFlask" />
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  ingredients: Array, // Array of ingredient objects
});

// Emits
const emits = defineEmits(['addToFlask']);

function handleAddToFlask() {
  emits('addToFlask', true);
}
</script>

<style scoped>
svg {
  scale: 2;
}

::v-deep .p-card-content {
  @apply justify-center w-full h-full;
}

::v-deep .p-card-body {
  @apply px-4 py-1 w-full h-full;
}

::v-deep .p-card-footer {
  @apply pt-0 pb-2;
}
</style>
