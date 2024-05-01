<template>
  <div>
    <img src="./assets/images/logo.png" />
  </div>
  <router-view />
</template>

<script setup></script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 1500px;
  margin-left: auto;
  margin-right: auto;
}

img {
  max-width: 200px;
}
</style>
