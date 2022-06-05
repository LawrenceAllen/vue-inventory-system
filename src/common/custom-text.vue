<script lang="ts" setup>

interface props {
  value: string
  isPrimary: boolean
}

const props = withDefaults(defineProps<props>(), {
  value: "Text",
  isPrimary: true
});

</script>

<template>
  <p v-if="isPrimary" class="text-xl text-black font-semibold break-words">
    {{ props.value }}
  </p>
  <p v-else class="text-md text-black">
    {{ props.value }}
  </p>
</template>