<script lang="ts" setup>

interface props {
  value?: string;
  isPrimary: boolean;
}

const props = withDefaults(defineProps<props>(), {
  value: "Text", 
  isPrimary: true
});

</script>

<template>
  <p v-if="isPrimary" class="text-lg text-black">
    {{ props.value }}
  </p>
  <p v-else class="text-lg text-white">
    {{ props.value }}
  </p>
</template>