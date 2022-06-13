<script lang="ts" setup>
import CustomText from '../../common/custom-text.vue';

interface props {
  currentMonth: string
  itemsSoldCurrentMonth: number
  salesCurrentMonth: number
}

const props = withDefaults(defineProps<props>(), {
  currentMonth: '',
  itemsSoldCurrentMonth: 0,
  salesCurrentMonth: 0
})
</script>

<template>
  <div class="bg-emerald-500 w-full rounded p-4">
    <CustomText class="text-xl" :isPrimary="true" :value="props.currentMonth"/>
    <div class="flex justify-between items-center my-2">
      <CustomText :isPrimary="true" :value="'Items sold:'"/>
      <CustomText :isPrimary="true" :value="String(props.itemsSoldCurrentMonth)"/>
    </div>
    <div class="flex justify-between items-center my-2">
      <CustomText :isPrimary="true" :value="'Revenue: '"/>
      <CustomText :isPrimary="true" :value="'₱' + props.salesCurrentMonth"/>
    </div>
  </div>
</template>