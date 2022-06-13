<script setup>
import { onSnapshot } from '@firebase/firestore';
import { ref, watchEffect } from 'vue';
import { soldColRef } from '../../../firebase-config';
import Sold from '../../components/reports/sold.vue'

const soldItemsList = ref([])
const sortedSoldItemsList = ref([])
const currentMonthSoldItems = ref([])
const currentMonthRetailPrice = ref([])
const currentMonthItemProfit = ref([])
const currentMonthProfit = ref(0)
const currentMonthSales = ref(0)
const monthYear = ref('')

onSnapshot(soldColRef, (snap) => {
  // returns the items from the firebase database
  soldItemsList.value = snap.docs.map(e => ({...e.data(), id: e.id}))
})

watchEffect(() => {
  // sorts the items by date
  sortedSoldItemsList.value = soldItemsList.value.sort((a, b) => Date.parse(a.date_sold) - Date.parse(b.date_sold))

  const currentMonth = new Date().toLocaleDateString('en-US', {month: "long"})
  const currentYear = new Date().toLocaleDateString('en-US', {year: "numeric"})
  // sets the current Month and Year
  monthYear.value = currentMonth + " " + currentYear

  // returns the MONTH and YEAR from the date_sold property (June 13, 2022)
  currentMonthSoldItems.value = sortedSoldItemsList.value.map((e) => ({
    month: e.date_sold.split(" ").at(0) + " " + e.date_sold.split(" ").at(2),
    retail_price: e.retail_price,
    item_profit: e.item_profit
  }))

  // sets the value of currentMonthSoldItems to items sold on current month
  currentMonthSoldItems.value = currentMonthSoldItems.value.filter(e => e.month === monthYear.value)

  // sets the value of currentMonthRetailPrice to retail price of items from currentMonthSoldItems
  currentMonthRetailPrice.value = currentMonthSoldItems.value.map(e => e.retail_price)

  // sets the value of currentMonthItemProfit to item profit of items from currentMonthSoldItems
  currentMonthItemProfit.value = currentMonthSoldItems.value.map(e => e.item_profit)

  // returns the sum of retail price from the items on currentMonthRetailPrice
  currentMonthSales.value = currentMonthRetailPrice.value.reduce((a, b) => a + b, 0)

  // returns the sum of ritem profit from the items on currentMonthItemProfit
  currentMonthProfit.value = currentMonthItemProfit.value.reduce((a, b) => a + b, 0)
})

</script>

<template>
  <div class="flex flex-col justify-center items-center gap-4 w-full">
    <p class="text-3xl text-white">Reports</p>
    <Sold 
      :currentMonth="monthYear"
      :itemsSoldCurrentMonth="currentMonthSoldItems.length" 
      :salesCurrentMonth="currentMonthSales"
      :profitCurrentMonth="currentMonthProfit"
    />
  </div>
</template>