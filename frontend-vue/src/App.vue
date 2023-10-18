<script setup>

import HelloWorld from "./components/HelloWorld.vue";

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
    <HelloWorld name="Michelle" />
  </header>

  <main>
    Shall we start?
  </main>
</template>

<style scoped>
</style>
