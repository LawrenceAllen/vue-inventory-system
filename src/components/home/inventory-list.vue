<script lang="ts" setup>
import { ref } from 'vue';
import InputSet from '../../common/input-set.vue';
import Product from './product.vue';

const searchText = ref('')

interface props {
  productList: any
}

const props = withDefaults(defineProps<props>(), {
  productList: []
});

</script>

<template>
  <InputSet 
    :isPrimary="false"
    :value="searchText" 
    :label="'Search'"
    :placeholder="'Product name'" 
    :type="'text'"
  />
  <div 
    v-if="productList.length < 4" 
    class="flex flex-col gap-4 bg-transparent w-full h-full rounded"
  >
    <div v-for="product in props.productList"  >
      <Product 
        :productID="product.id" 
        :productName="product.name" 
        :productPrice="product.price" 
        :productQuantity="product.quantity" 
        :productOrder="product.order"
      />
    </div>
  </div>
  <div 
    v-else
    class="flex flex-col gap-4 bg-transparent w-full h-96 overflow-y-scroll rounded"
  >
    <div v-for="product in props.productList"  >
      <Product 
        :productID="product.id" 
        :productName="product.name" 
        :productPrice="product.price" 
        :productQuantity="product.quantity" 
        :productOrder="product.order"
      />
    </div>
  </div>
</template>