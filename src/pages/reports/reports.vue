<script setup>
import { onSnapshot } from '@firebase/firestore';
import { ref, watchEffect } from 'vue';
import { soldColRef } from '../../../firebase-config';
import Sold from '../../components/reports/sold.vue'

const soldItemsList = ref([])
const sortedSoldItemsList = ref([])
const currentMonthSoldItems = ref([])
const newCurrentMonthSoldItems = ref([])
const monthYear = ref('')

onSnapshot(soldColRef, (snap) => {
  soldItemsList.value = snap.docs.map(e => ({...e.data(), id: e.id}))
})

watchEffect(() => {
  sortedSoldItemsList.value = soldItemsList.value.sort((a, b) => Date.parse(a.date_sold) - Date.parse(b.date_sold))

  const currentMonth = new Date().toLocaleDateString('en-US', {month: "long"})
  const currentYear = new Date().toLocaleDateString('en-US', {year: "numeric"})
  monthYear.value = currentMonth + " " + currentYear
  currentMonthSoldItems.value = sortedSoldItemsList.value.map((e) => ({
    month: e.date_sold.split(" ").at(0) + " " + e.date_sold.split(" ").at(2)
  }))
  currentMonthSoldItems.value = currentMonthSoldItems.value.filter(e => e.month === monthYear.value)
})

</script>

<template>
  <div class="flex flex-col justify-center items-center gap-4 w-full">
    <p class="text-3xl text-white">Reports</p>
    <Sold :itemsSoldMonth="currentMonthSoldItems.length" :currentMonth="monthYear"/>
  </div>
</template>