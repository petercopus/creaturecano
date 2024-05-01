<template>
  <Card class="w-32 bg-ashgray bg-opacity-10">
    <template #content>
      <font-awesome-icon :icon="icon" />
    </template>
    <template #footer>
      <div class="flex flex-col items-center justify-center gap-2">
        <label
          class="font-semibold"
          :for="inputId">
          {{ name }}
        </label>
        <Checkbox
          v-model="isChecked"
          :inputId="inputId"
          :name="name"
          :binary="true"
          @change="handleCheck"
          :disabled="selectedIngredientRemaining == 0 && !isChecked" />
      </div>
    </template>
  </Card>
</template>

<script setup>
import { ref, computed } from 'vue';
import { mainStore } from '@/stores/store.js';

const store = mainStore();

const selectedIngredientRemaining = computed(() => store.remainingIngredients);

const isChecked = ref(false);
const props = defineProps({
  name: String,
  icon: String,
});
const inputId = `ing_${props.name.toLowerCase()}`;

const emits = defineEmits(['checked']);

function handleCheck() {
  emits('checked', { name: props.name, icon: props.icon, checked: isChecked.value });
}
</script>

<style scoped>
svg {
  scale: 2;
}

label {
  gap: 10px;
}

::v-deep .p-card-content {
  @apply justify-center pt-5;
}

::v-deep .p-card-body {
  @apply px-4 py-1;
}

::v-deep .p-card-footer {
  @apply pt-0 pb-2;
}
</style>
