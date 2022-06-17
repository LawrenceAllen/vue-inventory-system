<script setup>

const emits = defineEmits(["onChange"])

const onChange = () => {
  emits("onChange")
}

const props = defineProps({
  isPrimary: Boolean,
  value: String,
  label: String,
  type: String,
  placeholder: String
})

</script>

<template>
  <div v-if="props.isPrimary" class="flex flex-col w-full">
    <p class="text-md font-semibold w-full">{{ props.label }}</p>
    <input
      class="h-9 p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-900" 
      :value="props.value"
      :type="props.type" 
      :placeholder="props.placeholder"
      @input="onChange"
    >
  </div>
  <div v-else class="flex flex-col w-full">
    <p class="text-md text-white font-semibold w-full">{{ props.label }}</p>
    <input
      class="h-9 p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500" 
      :value="props.value"
      :type="props.type" 
      :placeholder="props.placeholder"
      @input="onChange"
    >
  </div>
</template>