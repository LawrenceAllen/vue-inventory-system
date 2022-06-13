<script setup>
import { onSnapshot } from '@firebase/firestore';
import { ref, watchEffect } from 'vue';
import { soldColRef } from '../../../firebase-config';
import Sold from '../../components/reports/sold.vue'

const soldItemsList = ref([])
const sortedSoldItemsList = ref([])
const currentMonthSoldItems = ref([])
const currentMonthSoldAt = ref([])
const currentMonthSales = ref(0)
const monthYear = ref('')

onSnapshot(soldColRef, (snap) => {
  soldItemsList.value = snap.docs.map(e => ({...e.data(), id: e.id}))
})

watchEffect(() => {
  sortedSoldItemsList.value = soldItemsList.value.sort((a, b) => Date.parse(a.date_sold) - Date.parse(b.date_sold))

  const currentMonth = new Date().toLocaleDateString('en-US', {month: "long"})
  const currentYear = new Date().toLocaleDateString('en-US', {year: "numeric"})
  // sets the current Month and Year
  monthYear.value = currentMonth + " " + currentYear

  // returns the MONTH and YEAR from the date_sold property (June 13, 2022)
  currentMonthSoldItems.value = sortedSoldItemsList.value.map((e) => ({
    month: e.date_sold.split(" ").at(0) + " " + e.date_sold.split(" ").at(2)
  }))
  currentMonthSoldAt.value = sortedSoldItemsList.value.map(e => e.sold_at)

  // returns the items sold on the current month
  currentMonthSoldItems.value = currentMonthSoldItems.value.filter(e => e.month === monthYear.value)

  // returns the profit of items sold on the current month
  currentMonthSales.value = currentMonthSoldAt.value.reduce((a, b) => a + b, 0)
})




</script>

<template>
  <div class="flex flex-col justify-center items-center gap-4 w-full">
    <p class="text-3xl text-white">Reports</p>
    <Sold 
      :currentMonth="monthYear"
      :itemsSoldCurrentMonth="currentMonthSoldItems.length" 
      :salesCurrentMonth="currentMonthSales"
    />
  </div>
</template>