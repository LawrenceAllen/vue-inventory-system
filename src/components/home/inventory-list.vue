<script lang="ts" setup>
import { ref } from 'vue';
import CustomText from '../../common/custom-text.vue';
import InputSet from '../../common/input-set.vue';

const searchText = ref('')

interface props {
  productList: any
}

const props = withDefaults(defineProps<props>(), {
  productList: []
});

</script>

<template>
  <p class="text-3xl text-white">Inventory</p>
    <InputSet 
      :isPrimary="false"
      :value="searchText" 
      :label="'Search'"
      :placeholder="'Product name'" 
      :type="'text'"
    />
    <div v-if="productList.length < 4" class="flex flex-col gap-4 bg-transparent w-full h-full overflow-y-auto rounded">
      <div v-for="product in props.productList" class="bg-emerald-500 p-4 rounded">
        <CustomText :value="product.name" :isPrimary="true"/>
        <CustomText :value="'Price: ' + product.price" :isPrimary="false"/>
        <CustomText :value="'Quantity: ' + product.quantity" :isPrimary="false"/>
      </div>
    </div>
    <div v-else class="flex flex-col gap-4 bg-transparent w-full h-96 overflow-y-auto rounded">
      <div v-for="product in props.productList" class="bg-emerald-500 p-4 rounded">
        <CustomText :value="product.name" :isPrimary="true"/>
        <CustomText :value="'Price: ' + product.price" :isPrimary="false"/>
        <CustomText :value="'Quantity: ' + product.quantity" :isPrimary="false"/>
      </div>
    </div>
</template>