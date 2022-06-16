<script setup>
import { ref } from 'vue';
import Home from './pages/home/home.vue'
import Reports from './pages/reports/reports.vue'

const showReports = ref(false)

const toggleReport = () => {
  if (showReports.value) {
    showReports.value = false
  } else {
    showReports.value = true
  }
}

</script>

<template>
  <div class="p-6">
    <Home v-if="!showReports" @clickHandler="toggleReport"/>
    <Reports v-else @clickHandler="toggleReport"/>
  </div>
</template>
