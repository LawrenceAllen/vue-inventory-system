<script setup>
import { ref, watchEffect } from 'vue'
import CustomText from '../../common/custom-text.vue'
import CustomButton from '../../common/custom-button.vue'
import SoldDaysItem from './sold-days-item.vue'

const emits = defineEmits(["previousHandler", "nextHandler"])

const previousHandler = () => {
  emits("previousHandler")
}

const nextHandler = () => {
  emits("nextHandler")
}

const props = defineProps({
  latestDay: String,
  itemsSoldCurrentDay: Number,
  itemListSoldCurrentDay: Array,
  salesCurrentDay: Number,
  profitCurrentDay: Number,
})

const sortedItemListSoldCurrentDay = ref([])
const reducedTimeList = ref([])
const itemListSoldTime = ref([])
const productNameValue = ref('')

watchEffect(() => {
  // returns the sorted time
  sortedItemListSoldCurrentDay.value = props.itemListSoldCurrentDay.map((e) => ({
    name: e.name,
    date_sold: e.date_sold,
    time_sold: new Date(e.time_sold).toLocaleTimeString('en-us', {hour: 'numeric', minute: 'numeric'}),
    retail_price: e.retail_price,
    item_profit: e.item_profit
  })) 

  // reduces the size of sortedItemListSoldCurrentDay
  if (sortedItemListSoldCurrentDay.value.length !== 0) {
    const timeList = sortedItemListSoldCurrentDay.value
    let tempArray = []
    let temp = timeList[0].name
    tempArray.push(timeList[0])

    timeList.forEach(e => {
      if (temp !== e.name) {
        temp = e.name
        tempArray.push(e)
      }
    })
    
    reducedTimeList.value = tempArray
    temp = ''
    tempArray = []
  }

  itemListSoldTime.value = sortedItemListSoldCurrentDay.value.filter(e => e.name === productNameValue.value)
})

const getProductName = (string) => {
  productNameValue.value = string
}

</script>

<template>
  <div class="flex justify-between items-center bg-emerald-500 w-full rounded p-4">
    <CustomText 
      class="text-2xl" 
      :isPrimary="true" 
      :value="'<'" 
      @click="previousHandler"
    />
    <CustomButton 
      class="text-xl text-center rounded w-max px-4 drop-shadow" 
      :buttonType="'cancel'" 
      :value="props.latestDay"
    />
    <CustomText 
      class="text-2xl" 
      :isPrimary="true" 
      :value="'>'"
      @click="nextHandler" 
    />
  </div>
  <div class="bg-emerald-500 w-full rounded p-4">
    <div class="flex justify-between items-center my-2">
      <CustomText class="text-lg" :isPrimary="true" :value="'Items sold:'"/>
      <CustomText :isPrimary="true" :value="String(props.itemsSoldCurrentDay)"/>
    </div>
    <div class="flex justify-between items-center my-2">
      <CustomText class="text-lg" :isPrimary="true" :value="'Revenue: '"/>
      <CustomText :isPrimary="true" :value="'₱' + props.salesCurrentDay"/>
    </div>
    <div class="flex justify-between items-center my-2">
      <CustomText class="text-lg" :isPrimary="true" :value="'Profit: '"/>
      <CustomText :isPrimary="true" :value="'₱' + props.profitCurrentDay"/>
    </div>
  </div>
  <div class="flex flex-col gap-4 w-full h-96">
    <div v-for="item in reducedTimeList" class="flex flex-col gap-2">
      <SoldDaysItem
        :key="item.id" 
        :productName="item.name"
        :timeSold="item.time_sold"
        :itemList="itemListSoldTime"
        @clickHandler="getProductName(item.name)"
      />
    </div>
  </div>
</template>