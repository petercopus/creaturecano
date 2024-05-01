<template>
  <div class="w-2/3">
    <Card class="glass">
      <template #title>
        <font-awesome-icon
          icon="champagne-glasses"
          class="fa-3x" />
        <h1>Congratulations!</h1>
      </template>
      <template #subtitle>
        <h4>Take a look at your new creation!</h4>
      </template>
      <template #content>
        <div class="flex flex-col w-full items-center">
          <div class="mt-10 mb-5">
            <CombinedCreatureIcon
              :icon1="creation.icon1"
              :icon2="creation.icon2"
              :size="'fa-4x'"
              :panel="0" />
          </div>

          <div class="flex gap-2 items-center mb-6">
            <font-awesome-icon
              class="fa-xl"
              :icon="creation.gender.icon"
              :style="{ color: creation.gender.color }" />
            <p class="text-xl font-bold">{{ creation.name }}</p>
          </div>

          <div class="flex gap-8 justify-center">
            <Card class="w-48 bg-ashgray bg-opacity-10">
              <template #title>Food</template>
              <template #content>
                <div class="flex flex-col items-center gap-3 w-full">
                  <font-awesome-icon
                    class="fa-2x"
                    :icon="creation.food.icon"
                    :style="{ color: creation.food.color }" />
                  <div>
                    <p class="font-semibold">{{ Number(creation.foodQty).toLocaleString() }} {{ creation.foodMeasurement }}</p>
                    <p class="text-xs font-semibold">({{ creation.foodInterval }})</p>
                  </div>
                </div>
              </template>
            </Card>

            <Card class="w-48 bg-ashgray bg-opacity-10">
              <template #title>Activity</template>
              <template #content>
                <div class="flex flex-col items-center gap-3 w-full">
                  <font-awesome-icon
                    class="fa-2x"
                    :icon="creation.activityLevel.icon"
                    :style="{ color: creation.activityLevel.color }" />
                  <p class="font-semibold">{{ creation.activityLevel.name }}</p>
                </div>
              </template>
            </Card>

            <Card class="w-48 bg-ashgray bg-opacity-10">
              <template #title>Sleep</template>
              <template #content>
                <div class="flex flex-col items-center gap-3 w-full">
                  <font-awesome-icon
                    class="fa-2x"
                    :icon="creation.sleepCycle.icon"
                    :style="{ color: creation.sleepCycle.color }" />
                  <p class="font-semibold">{{ creation.sleepCycle.name }}</p>
                </div>
              </template>
            </Card>

            <Card class="w-48 bg-ashgray bg-opacity-10">
              <template #title>Stats</template>
              <template #content>
                <div class="flex flex-col items-center gap-3 w-full">
                  <div class="hp flex items-center gap-2">
                    <font-awesome-icon
                      icon="heart"
                      :style="{ color: '#FF0000' }" />
                    <p class="font-semibold">{{ Number(creation.health).toLocaleString() }}</p>
                  </div>
                  <div class="stamina flex items-center gap-2">
                    <font-awesome-icon
                      icon="person-running"
                      :style="{ color: '#00ff00' }" />
                    <p class="font-semibold">{{ Number(creation.stamina).toLocaleString() }}</p>
                  </div>
                  <div class="dexterity flex items-center gap-2">
                    <font-awesome-icon
                      icon="hands-holding-circle"
                      :style="{ color: '#56EEF4' }" />
                    <p class="font-semibold">{{ Number(creation.dexterity).toLocaleString() }}</p>
                  </div>
                  <div class="rarity flex items-center gap-2">
                    <font-awesome-icon
                      icon="shield"
                      :style="{ color: creation.rarity.color }" />
                    <p
                      class="font-semibold"
                      :style="{ color: creation.rarity.color }">
                      {{ creation.rarity.name }}
                    </p>
                  </div>
                </div>
              </template>
            </Card>
          </div>

          <div class="flex gap-2 mt-4">
            <Chip
              class="font-semibold"
              :label="creation.ingredient1" />
            <Chip
              class="font-semibold"
              :label="creation.ingredient2" />
          </div>

          <!-- <p>Ingredients: {{ creation.ingredient1 }} + {{ creation.ingredient2 }}</p> -->
        </div>
      </template>
      <template #footer>
        <Button
          label="Complete"
          @click="handleComplete" />
      </template>
    </Card>
  </div>
</template>

<script setup>
import CombinedCreatureIcon from './CombinedCreatureIcon.vue';

const props = defineProps({
  creation: Object,
});

const emits = defineEmits(['complete']);

function handleComplete() {
  emits('complete', true);
}
</script>

<style scoped>
p {
  margin: 0;
}
</style>
