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
  <p v-if="isPrimary" class="font-semibold break-words">
    {{ props.value }}
  </p>
  <p v-else class="text-md">
    {{ props.value }}
  </p>
</template>