<script lang="ts" setup>
import CustomText from '../../common/custom-text.vue';

interface props {
  itemsSoldCurrentMonth: number
  salesCurrentMonth: number
  profitCurrentMonth: number
}

const props = withDefaults(defineProps<props>(), {
  itemsSoldCurrentMonth: 0,
  salesCurrentMonth: 0,
  profitCurrentMonth: 0
})
</script>

<template>
  <div class="bg-emerald-500 w-full rounded p-4">
    <div class="flex justify-between items-center my-2">
      <CustomText class="text-lg" :isPrimary="true" :value="'Items sold:'"/>
      <CustomText :isPrimary="true" :value="String(props.itemsSoldCurrentMonth)"/>
    </div>
    <div class="flex justify-between items-center my-2">
      <CustomText class="text-lg" :isPrimary="true" :value="'Revenue: '"/>
      <CustomText :isPrimary="true" :value="'₱' + props.salesCurrentMonth"/>
    </div>
    <div class="flex justify-between items-center my-2">
      <CustomText class="text-lg" :isPrimary="true" :value="'Profit: '"/>
      <CustomText :isPrimary="true" :value="'₱' + props.profitCurrentMonth"/>
    </div>
  </div>
</template>