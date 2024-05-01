<template>
  <div class="w-full flex flex-col gap-4">
    <Card
      v-for="(creation, index) in creations"
      :key="creation"
      class="bg-slate-400 w-full">
      <template #content>
        <div
          v-if="!creation.viewInfo"
          class="flex flex-col gap-1 w-full">
          <div class="flex items-center gap-4 h-24">
            <!-- <div class="relative w-20 h-20">
              <font-awesome-icon
                :icon="creation.icon1"
                class="fa-3x"
                :style="{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', color: '#DED6D6', zIndex: 2 }" />
              <font-awesome-icon
                :icon="creation.icon2"
                class="fa-2x"
                :style="{ position: 'absolute', top: '100%', left: '50%', transform: 'translate(-60%, -150%) rotate(180deg)', color: '#A09292', zIndex: 1 }" />
            </div> -->

            <div class="mt-10 mb-5">
              <CombinedCreatureIcon
                :icon1="creation.icon1"
                :icon2="creation.icon2"
                :size="'fa-3x'"
                :panel="1" />
            </div>
            <div class="flex gap-2 items-center">
              <font-awesome-icon
                class="fa-xl"
                :icon="creation.gender.icon"
                :style="{ color: creation.gender.color }" />
              <p class="text-xl font-bold">{{ creation.name }}</p>
            </div>
          </div>

          <div>
            <Button
              icon="pi pi-question-circle"
              label="Info"
              @click="handleViewInfo(index)"></Button>
          </div>
        </div>

        <div v-if="creation.viewInfo">
          <div class="flex flex-col gap-4 w-full items-center">
            <div class="flex flex-col justify-center items-center gap-1">
              <div class="mt-10">
                <CombinedCreatureIcon
                  :icon1="creation.icon1"
                  :icon2="creation.icon2"
                  :size="'fa-4x'"
                  :panel="2" />
              </div>
              <div class="flex gap-2 items-center">
                <font-awesome-icon
                  class="fa-xl"
                  :icon="creation.gender.icon"
                  :style="{ color: creation.gender.color }" />
                <p class="text-xl font-bold">{{ creation.name }}</p>
              </div>
            </div>
            <div class="flex flex-wrap gap-4 justify-center w-full">
              <Card class="basis-1/2-gap-4 bg-purpleCustom bg-opacity-20">
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
              <Card class="basis-1/2-gap-4 bg-purpleCustom bg-opacity-20">
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
              <Card class="basis-1/2-gap-4 bg-purpleCustom bg-opacity-20">
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
              <Card class="basis-1/2-gap-4 bg-purpleCustom bg-opacity-20">
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
            <div class="flex flex-col w-full gap-2">
              <Button
                severity="danger"
                icon="pi pi-trash"
                label="OMG! Throw it back!"
                @click="handleThrowItBack(index)"></Button>
              <Button
                severity="success"
                icon="pi pi-check"
                label="What a fine specimen!"
                @click="handleUnviewInfo(index)"></Button>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import CombinedCreatureIcon from './CombinedCreatureIcon.vue';
import { mainStore } from '@/stores/store.js';
const store = mainStore();

const props = defineProps({
  creations: Array,
});

function handleThrowItBack(index) {
  store.throwItBack(index);
}
function handleUnviewInfo(index) {
  store.unviewInfo(index);
}
function handleViewInfo(index) {
  store.viewInfo(index);
}
</script>

<style scoped>
::v-deep .p-card {
  @apply bg-ashgray bg-opacity-10;
}
::v-deep .p-card-content {
  @apply justify-center p-0;
}
p {
  margin: 0;
}

button {
  padding: 10px 10px;
  width: 100%;
}
</style>
