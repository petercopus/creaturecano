<template>
  <Menubar
    class="m-5"
    :model="items">
    <template #start>
      <svg
        width="35"
        height="40"
        viewBox="0 0 35 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="h-2rem">
        <path
          d="..."
          fill="var(--primary-color)" />
        <path
          d="..."
          fill="var(--text-color)" />
      </svg>
    </template>
    <template #item="{ item, props }">
      <a
        class="flex align-items-center"
        v-bind="props.action"
        :href="item.to">
        <span :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
      </a>
    </template>
  </Menubar>
</template>

<script setup>
import { ref } from 'vue';

const items = ref([
  { label: 'Home', icon: 'pi pi-fw pi-home', to: '/' },
  { label: 'About', icon: 'pi pi-fw pi-info-circle', to: '/about' },
]);
</script>

<style scoped></style>
