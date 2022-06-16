<script lang="ts" setup>
import CustomText from '../../common/custom-text.vue'
import CustomButton from '../../common/custom-button.vue'

const emits = defineEmits(["previousHandler", "nextHandler"])

const previousHandler = () => {
  emits("previousHandler")
}

const nextHandler = () => {
  emits("nextHandler")
}

interface props {
  latestDay: string
  itemsSoldCurrentDay: number
  salesCurrentDay: number
  profitCurrentDay: number
}

const props = withDefaults(defineProps<props>(), {
  latestDay: '',
  itemsSoldCurrentDay: 0,
  salesCurrentDay: 0,
  profitCurrentDay: 0
})

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
</template>