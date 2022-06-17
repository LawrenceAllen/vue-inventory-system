<script setup>
import CustomText from '../../common/custom-text.vue';

</script>

<template>
  <div class="flex justify-between items-center w-full p-4 text-lg bg-emerald-500 rounded mb-4">
    <CustomText :isPrimary="true" :value="'asd'" />
    <CustomText :isPrimary="false" :value="'asd'" />
  </div>
</template>