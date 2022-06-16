<script lang="ts" setup>
import CustomText from '../../common/custom-text.vue';
import CustomButton from '../../common/custom-button.vue';

const emits = defineEmits(["previousHandler", "nextHandler"])

const previousHandler = () => {
  emits("previousHandler")
}

const nextHandler = () => {
  emits("nextHandler")
}

interface props {
  latestMonth: string
  itemsSoldCurrentMonth: number
  salesCurrentMonth: number
  profitCurrentMonth: number
}

const props = withDefaults(defineProps<props>(), {
  latestMonth: '',
  itemsSoldCurrentMonth: 0,
  salesCurrentMonth: 0,
  profitCurrentMonth: 0
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
      class="text-xl text-center rounded w-40 drop-shadow" 
      :buttonType="'cancel'" 
      :value="props.latestMonth"
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