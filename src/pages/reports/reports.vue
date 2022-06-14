<script setup>
import { onSnapshot } from '@firebase/firestore';
import { ref, watchEffect } from 'vue';
import { soldColRef } from '../../../firebase-config';
import Sold from '../../components/reports/sold.vue'
import CustomText from '../../common/custom-text.vue';
import CustomButton from '../../common/custom-button.vue';

const soldItemsList = ref([])
const sortedSoldItemsList = ref([])
const currentMonthSoldItems = ref([])
const itemsSoldMonthList = ref([])
const currentMonthProfit = ref(0)
const currentMonthSales = ref(0)
const latestMonth = ref('')
const reducedMonthList = ref([])
const index = ref(0)

onSnapshot(soldColRef, (snap) => {
  // returns the items from the firebase database
  soldItemsList.value = snap.docs.map(e => ({...e.data(), id: e.id}))
})

watchEffect(() => {
  // returns the latest items that were sold
  sortedSoldItemsList.value = soldItemsList.value.sort((a, b) => Date.parse(b.date_sold) - Date.parse(a.date_sold))

  // returns the latest MONTH and YEAR from the items that were sold
  if (sortedSoldItemsList.value[0] !== undefined) {
    const latestDate = sortedSoldItemsList.value[0]
    if (latestMonth.value === '') {
      latestMonth.value = latestDate.date_sold.split(" ").at(0) + " " + latestDate.date_sold.split(" ").at(2)
    }
  }

  // returns the items from the latest month
  currentMonthSoldItems.value = sortedSoldItemsList.value.map((e) => ({
    month: e.date_sold.split(" ").at(0) + " " + e.date_sold.split(" ").at(2),
    retail_price: e.retail_price,
    item_profit: e.item_profit
  }))

  // returns the month from the soldItemsList
  itemsSoldMonthList.value = sortedSoldItemsList.value.map((e) => e.date_sold.split(" ").at(0) + " " + e.date_sold.split(" ").at(2))

  // reduces the size of months from itemsSoldMonthList
  if (itemsSoldMonthList.value.length !== 0) {
    let tempArray = []
    let temp = itemsSoldMonthList.value[0]
    tempArray.push(temp)

    itemsSoldMonthList.value.forEach(month => {
      if (temp !== month) {
        temp = month
        tempArray.push(temp)
      }
    })

    reducedMonthList.value = tempArray
    temp = ''
    tempArray = []
  }

  // returns the items based on the latestMonth value
  currentMonthSoldItems.value = currentMonthSoldItems.value.filter(e => e.month === latestMonth.value)

  // returns the sum of retail price from the items on currentMonthRetailPrice
  const currentMonthRetailPrice = currentMonthSoldItems.value.map(e => e.retail_price)
  currentMonthSales.value = currentMonthRetailPrice.reduce((a, b) => a + b, 0)

  // returns the sum of item profit from the items on currentMonthItemProfit
  const currentMonthItemProfit = currentMonthSoldItems.value.map(e => e.item_profit)
  currentMonthProfit.value = currentMonthItemProfit.reduce((a, b) => a + b, 0)

})

const traverseMonths = (string) => {
  if (reducedMonthList.value.length !== 0) {
    if (string === "previous") {
      index.value += 1
      if (reducedMonthList.value[index.value] === undefined) {
        index.value -= 1
      } else {
        latestMonth.value = reducedMonthList.value[index.value]
      }
    } else {
      index.value -= 1
      if (reducedMonthList.value[index.value] === undefined) {
        index.value += 1
      } else {
        latestMonth.value = reducedMonthList.value[index.value]
      }
    }
  }
}

</script>

<template>
  <div class="flex flex-col justify-center items-center gap-4 w-full">
    <p class="text-3xl text-white">Reports</p>
    <div class="flex justify-between items-center bg-emerald-500 w-full rounded p-4">
      <CustomText class="text-2xl" :isPrimary="true" :value="'<'" @click="() => traverseMonths('previous')"/>
      <CustomButton class="text-xl text-center rounded w-40 drop-shadow" :buttonType="'cancel'" :value="latestMonth"/>
      <CustomText class="text-2xl" :isPrimary="true" :value="'>'" @click="() => traverseMonths('next')"/>
    </div>
    <Sold 
      :itemsSoldCurrentMonth="currentMonthSoldItems.length" 
      :salesCurrentMonth="currentMonthSales"
      :profitCurrentMonth="currentMonthProfit"
    />
  </div>
</template>