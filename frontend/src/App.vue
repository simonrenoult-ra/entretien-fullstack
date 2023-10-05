<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'

async function logCarboneFootprints() {
  const url = "http://localhost:1337/carbone-footprints";
  const response = await fetch(url);
  const carboneFootprints = await response.json();
  console.log(carboneFootprints);
}

logCarboneFootprints()

</script>

<template>
  <header>
    Hello world
  </header>

  <main>
    Main content
  </main>
</template>

<style scoped>
</style>
