<script setup>

const props = defineProps({
  value: String,
  isPrimary: Boolean
})

</script>

<template>
  <p v-if="isPrimary" class="font-semibold break-words">
    {{ props.value }}
  </p>
  <p v-else class="text-md">
    {{ props.value }}
  </p>
</template>