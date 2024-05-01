<template>
  <div class="m-5 flex justify-center gap-10 max-h-screen min-h-fit h-fit">
    <CreationSuccess
      v-if="creationStep === 4"
      :creation="latestCreation"
      @complete="handleComplete" />

    <Card
      class="p-8 w-2/3 max-h-150 min-h-150 h-150 glass"
      v-if="creationStep === 0">
      <template #title>Choose Ingredients</template>
      <template #subtitle>{{ selectedIngredientRemaining }} remaining</template>
      <template #content>
        <Ingredient
          v-for="item in ingredientOptions"
          :key="item.name"
          :name="item.name"
          :icon="item.icon"
          @checked="handleIngredientChecked" />
      </template>
    </Card>
    <Card
      class="p-8 w-2/3 max-h-150 min-h-150 h-150 glass"
      v-if="creationStep >= 1 && creationStep <= 3">
      <template
        v-if="creationStep == 1"
        #title>
        Mix Creation
      </template>
      <template
        v-if="creationStep == 2"
        #title>
        Ready to Rumble?
      </template>
      <template
        v-if="creationStep == 3"
        #title>
        Now you're cookin'!
      </template>
      <template
        v-if="creationStep == 1"
        #subtitle>
        {{ selectedIngredientCount }}/{{ selectedIngredientMax }} ingredients
      </template>
      <template #content>
        <div class="inner-wrapper flex justify-center">
          <IngredientList
            v-if="creationStep === 1"
            :ingredients="selectedIngredientList"
            @addToFlask="handleAddToFlask" />

          <Flask
            v-if="creationStep === 2"
            @tossFlask="handleTossFlask" />

          <Volcano
            v-if="creationStep === 3"
            @collectCreation="handleCollectCreation" />
        </div>
      </template>
    </Card>
    <Card class="p-8 w-1/3 overflow-y-auto glass">
      <template #title>Creations</template>
      <template #subtitle>Little bit of this, little bit of that.</template>
      <template #content>
        <CreationList
          v-if="creations.length > 0"
          :creations="creations" />
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { mainStore } from '@/stores/store.js';
import Ingredient from './Ingredient.vue';
import IngredientList from './IngredientList.vue';
import Flask from './Flask.vue';
import Volcano from './Volcano.vue';
import CreationSuccess from './CreationSuccess.vue';
import CreationList from './CreationList.vue';

const store = mainStore();

const creationStep = computed(() => store.creationStep);
const selectedIngredientMax = computed(() => store.ingredientMax);
const selectedIngredientCount = computed(() => store.ingredientCount);
const selectedIngredientRemaining = computed(() => store.remainingIngredients);
const selectedIngredientList = computed(() => store.ingredientList);

const latestCreation = computed(() => store.latestCreation);
const creations = computed(() => store.creations);

function handleIngredientChecked(event) {
  if (event.checked === true) {
    console.log('checked');
    if (selectedIngredientRemaining.value > 0) {
      console.log('adding ing');
      store.addIngredient(event.name, event.icon);
    } else {
      return;
    }
  } else {
    console.log('unchecked');
    store.removeIngredient(event.name);
  }
}

function handleAddToFlask() {
  store.addToFlask();
}

function handleTossFlask() {
  store.tossFlask();
}

function handleCollectCreation() {
  store.collectCreation();
}

function handleComplete() {
  store.completeCreation();
}
const ingredientOptions = ref([
  { name: 'Hippo', icon: 'hippo' },
  { name: 'Otter', icon: 'otter' },
  { name: 'Dog', icon: 'dog' },
  { name: 'Cow', icon: 'cow' },
  { name: 'Fish', icon: 'fish' },
  { name: 'Dragon', icon: 'dragon' },
  { name: 'Kiwi Bird', icon: 'kiwi-bird' },
  { name: 'Worm', icon: 'worm' },
  { name: 'Spider', icon: 'spider' },
  { name: 'Shrimp', icon: 'shrimp' },
  { name: 'Mosquito', icon: 'mosquito' },
  { name: 'Locust', icon: 'locust' },
  { name: 'Horse', icon: 'horse' },
  { name: 'Frog', icon: 'frog' },
  { name: 'Fish Fins', icon: 'fish-fins' },
  { name: 'Dove', icon: 'dove' },
  { name: 'Crow', icon: 'crow' },
  { name: 'Cat', icon: 'cat' },
  { name: 'Ants', icon: 'bugs' },
]);
</script>

<style scoped>
::v-deep .p-card-content {
  @apply flex flex-wrap gap-4 justify-center;
}
</style>
