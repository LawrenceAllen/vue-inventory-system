<script setup>
import { ref, watchEffect } from 'vue';
import CustomText from '../../common/custom-text.vue'

const props = defineProps({
  productName: String,
  timeSold: String,
  itemList: Array,
})

const showItemList = ref(false)

const toggleItemList = () => {
  if (showItemList.value) {
    showItemList.value = false
  } else {
    showItemList.value = true
  }
}
const emits = defineEmits(['clickHandler'])

const clickHandler = () => {
  emits('clickHandler')
  toggleItemList()
}

</script>

<template>
  <div class="flex justfiy-between items-center bg-emerald-200 p-4 w-full rounded" @click="clickHandler">
    <div class="flex flex-col w-full text-lg">
      <CustomText :isPrimary="true" :value="props.productName" />
      <CustomText :isPrimary="false" :value="props.timeSold" />
    </div>
    <v-icon name="md-arrowdropdown-round" scale="2.8" class="fill-emerald-900"/>
  </div>
  <div v-if="showItemList" class="flex flex-col gap-2 h-96 overflow-y-auto mb-4 px-1">
    <div v-for="item in itemList" class="bg-emerald-500 w-full p-4 rounded">
      <div class="flex justify-between w-full">
        <CustomText :isPrimary="true" :value="item.name" />
        <CustomText :isPrimary="false" :value="'Time: ' + item.time_sold" />
      </div>
      <CustomText :isPrimary="false" :value="'Retail Price: ' + '₱' + item.retail_price" />
      <CustomText :isPrimary="false" :value="'Item Profit: ' + '₱' + item.item_profit" />
    </div>
  </div>
</template>