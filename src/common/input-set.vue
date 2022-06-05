<script lang="ts" setup>

const emits = defineEmits(["onChange"])

const onChange = () => {
  emits("onChange")
}

interface props {
  isPrimary: boolean
  value: any
  label: string
  type: string
  placeholder: string
}

const props = withDefaults(defineProps<props>(), {
  isPrimary: true,
  value: '',
  label: 'Input Label',
  type: "text",
  placeholder: ''
 
});

</script>

<template>
  <div v-if="props.isPrimary" class="flex flex-col w-full">
    <p class="text-md font-semibold w-full">{{ props.label }}</p>
    <input
      class="h-9 p-2 rounded" 
      :value="props.value"
      :type="props.type" 
      :placeholder="props.placeholder"
      @input="onChange"
    >
  </div>
  <div v-else class="flex flex-col w-full">
    <p class="text-md text-white font-semibold w-full">{{ props.label }}</p>
    <input
      class="h-9 p-2 rounded" 
      :value="props.value"
      :type="props.type" 
      :placeholder="props.placeholder"
      @input="onChange"
    >
  </div>
</template>