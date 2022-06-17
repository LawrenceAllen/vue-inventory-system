<script setup>
import { onSnapshot } from '@firebase/firestore';
import { ref, watchEffect } from 'vue';
import { soldColRef } from '../../../firebase-config';
import SoldMonths from '../../components/reports/sold-months.vue'
import SoldDays from '../../components/reports/sold-days.vue'
import CustomButton from '../../common/custom-button.vue';

const emits = defineEmits(["clickHandler"])

const clickHandler = () => {
  emits("clickHandler")
}

const soldItemsList = ref([])
const sortedSoldItemsList = ref([])
const currentMonthSoldItems = ref([])
const currentDaySoldItems = ref([])
const itemsSoldMonthList = ref([])
const itemsSoldDayList = ref([])
const currentMonthProfit = ref(0)
const currentDayProfit = ref(0)
const currentMonthSales = ref(0)
const currentDaySales = ref(0)
const latestMonth = ref('')
const latestDay = ref('')
const reducedMonthList = ref([])
const reducedDayList = ref([])
const index = ref(0)
const isMonth = ref(false)

onSnapshot(soldColRef, (snap) => {
  // returns the items from the firebase database
  soldItemsList.value = snap.docs.map(e => ({...e.data(), id: e.id}))
})

watchEffect(() => {
  // returns the sorted latest items that were sold
  sortedSoldItemsList.value = soldItemsList.value.sort((a, b) => Date.parse(b.date_sold) - Date.parse(a.date_sold))

  // returns the latest MONTH and YEAR from the items that were sold
  if (sortedSoldItemsList.value[0] !== undefined) {
    const latestDate = sortedSoldItemsList.value[0]
    if (latestMonth.value === '') {
      latestMonth.value = latestDate.date_sold.split(" ").at(0) + " " + latestDate.date_sold.split(" ").at(2)
    }
  }

  // returns the latest MONTH and DAY from the items that were sold
  if (sortedSoldItemsList.value[0] !== undefined) {
    const latestDate = sortedSoldItemsList.value[0]
    if (latestDay.value === '') {
      latestDay.value = latestDate.date_sold
    }
  }

  // returns the items from the latest day
  currentDaySoldItems.value = sortedSoldItemsList.value.filter(e => e.date_sold === latestDay.value)

  // returns the items from the latest month
  currentMonthSoldItems.value = sortedSoldItemsList.value.map((e) => ({
    month: e.date_sold.split(" ").at(0) + " " + e.date_sold.split(" ").at(2),
    retail_price: e.retail_price,
    item_profit: e.item_profit
  }))

  // returns the month from the soldItemsList
  itemsSoldMonthList.value = sortedSoldItemsList.value.map((e) => e.date_sold.split(" ").at(0) + " " + e.date_sold.split(" ").at(2))

  // returns the days from the sortedSoldItemsList
  itemsSoldDayList.value = sortedSoldItemsList.value.map(e => e.date_sold)

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

  // reduces the size of days from currentDaySoldItems
  if (itemsSoldDayList.value.length !== 0) {
    let tempArray = []
    let temp = currentDaySoldItems.value[0]

    itemsSoldDayList.value.forEach(month => {
      if (temp !== month) {
        temp = month
        tempArray.push(temp)
      }
    })

    reducedDayList.value = tempArray
    temp = ''
    tempArray = []
  }

  // returns the sum of retail price from the items on currentDayRetailPrice
  const currentDayRetailPrices = currentDaySoldItems.value.map(e => e.retail_price)
  currentDaySales.value = currentDayRetailPrices.reduce((a, b) => a + b, 0)

  // returns the sum of item profit from the items on currentDayItemProfit
  const currentDayItemProfit = currentDaySoldItems.value.map(e => e.item_profit)
  currentDayProfit.value = currentDayItemProfit.reduce((a, b) => a + b, 0)

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

const traverseDays = (string) => {
  if (reducedDayList.value.length !== 0) {
    if (string === "previous") {
      index.value += 1
      if (reducedDayList.value[index.value] === undefined) {
        index.value -= 1
      } else {
        latestDay.value = reducedDayList.value[index.value]
      }
    } else {
      index.value -= 1
      if (reducedDayList.value[index.value] === undefined) {
        index.value += 1
      } else {
        latestDay.value = reducedDayList.value[index.value]
      }
    }
  }
}

const toggleMonths = () => {
  if (isMonth.value) {
    isMonth.value = false
  } else {
    isMonth.value = true
  }
}

</script>

<template>
  <div class="flex flex-col justify-center items-center gap-4 w-full">
    <div class="flex justify-between items-center gap-4 w-full">
      <div class="flex justify-between items-center gap-1" @click="clickHandler">
        <p class="text-2xl text-white">Reports</p>
        <v-icon 
          name="hi-solid-switch-horizontal" 
          class="text-emerald-400"  
          scale="1.5"
        />
      </div>
      <CustomButton v-if="isMonth" class="self-center text-center rounded h-10 w-max px-4 drop-shadow" :buttonType="'else'" :value="'Switch to Days'" @click="toggleMonths" />
      <CustomButton v-else class="self-center text-center rounded h-10 w-max px-4 drop-shadow" :buttonType="'else'" :value="'Switch to Months'" @click="toggleMonths"/>
    </div>
    
    <SoldMonths
      v-if="isMonth"
      :latestMonth="latestMonth" 
      :itemsSoldCurrentMonth="currentMonthSoldItems.length" 
      :salesCurrentMonth="currentMonthSales"
      :profitCurrentMonth="currentMonthProfit"
      @previousHandler="traverseMonths('previous')"
      @nextHandler="traverseMonths('next')"
    />
    <SoldDays 
      v-else
      :latestDay="latestDay"
      :itemsSoldCurrentDay="currentDaySoldItems.length"
      :itemListSoldCurrentDay="currentDaySoldItems"
      :salesCurrentDay="currentDaySales"
      :profitCurrentDay="currentDayProfit"
      @previousHandler="traverseDays('previous')"
      @nextHandler="traverseDays('next')"
    />
  </div>
</template>