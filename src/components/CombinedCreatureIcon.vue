<template>
  <div class="relative w-20 h-20">
    <font-awesome-icon
      :icon="icon1"
      :class="size"
      :style="styleObjTop" />
    <font-awesome-icon
      :icon="icon2"
      :class="size"
      :style="styleObjBottom" />
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const props = defineProps({
  icon1: String,
  icon2: String,
  size: String,
  panel: Number,
});

const styleObjTop = reactive({
  position: 'absolute',
  top: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  color: '#DED6D6',
  zIndex: 2,
});

const styleObjBottom = reactive({
  position: 'absolute',
  top: '100%',
  left: '50%',
  transform: 'translate(-60%, -150%) scale(0.9, 1.5) rotate(-10deg)',
  color: '#A09292',
  zIndex: 1,
});

if (props.panel && props.panel == 1) {
  styleObjBottom.transform = 'translate(-60%, -190%) scale(0.9, 1.5) rotate(-10deg)';
} else if (props.panel && props.panel == 2) {
  // styleObjBottom.transform = 'translate(-60%, -150%) scale(0.9, 1.5) rotate(-10deg)';
}
</script>

<style scoped></style>
