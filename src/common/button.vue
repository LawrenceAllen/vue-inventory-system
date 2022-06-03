<script lang="ts" setup>
import Text from './text.vue'

interface props {
  style: string
  isPrimary: boolean;
}

const props = withDefaults(defineProps<props>(), {
  style: '',
  isPrimary: true
});

</script>

<template>
  <button v-if="isPrimary" class="m-4 p-1 w-full bg-yellow-400 drop-shadow-md rounded-md">
    <Text :isPrimary="true" :value="'Save'"/>
  </button>
  <button v-else class="m-20 p-1 w-32 bg-blue-500 drop-shadow-md rounded-md">
    <Text :isPrimary="false" :value="'Cancel'"/>
  </button>
</template>