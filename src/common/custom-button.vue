<script setup>

const emits = defineEmits(["onClick"])

const onClick = () => {
  emits("onClick")
}

const props = defineProps({
  buttonType: String,
  value: String
})

</script>

<template>
  <button v-if="buttonType === 'save'" class="p-1 w-full bg-emerald-900" @click="onClick">
    <p class="font-semibold">{{ props.value }}</p>
  </button>
  <button v-else-if="buttonType === 'cancel'" class="p-1 w-full bg-emerald-100" @click="onClick">
    <p class="font-semibold">{{ props.value }}</p>
  </button>
  <button v-else class="p-1 w-full bg-emerald-400" @click="onClick">
    <p class="font-semibold">{{ props.value }}</p>
  </button>
</template>