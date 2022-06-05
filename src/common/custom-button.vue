<script lang="ts" setup>

interface props {
  isPrimary: boolean
}

const props = withDefaults(defineProps<props>(), {
  isPrimary: true
});

</script>

<template>
  <button v-if="isPrimary" class="p-1 w-full bg-blue-500 rounded-md">
    <p class="text-white text-lg font-semibold">Save</p>
  </button>
  <button v-else class="p-1 w-full bg-emerald-600 rounded-md">
    <p class="text-white text-lg font-semibold">Cancel</p>
  </button>
</template>