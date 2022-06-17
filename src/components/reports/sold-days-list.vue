<script setup>
import CustomText from '../../common/custom-text.vue';

const emits = defineEmits(['clickHandler'])

const clickHandler = (string) => {
  emits('clickHandler', string)
}

const props = defineProps({
  dayList: Array
})

</script>

<template>
  <div class="flex flex-col justify-center gap-6 absolute bg-black bg-opacity-75 inset-0 p-4">
    <div v-for="day in props.dayList">
      <div class="flex justify-center items-center bg-emerald-500 w-full h-12 rounded text-xl" @click="clickHandler(day)">
        <CustomText :isPrimary="true" :value="day"/>
      </div>
    </div>
  </div>
</template>