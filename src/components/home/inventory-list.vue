<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import InputSet from '../../common/input-set.vue';
import Product from './product.vue';

interface props {
  productList: any
}

const props = withDefaults(defineProps<props>(), {
  productList: []
});

const searchText = ref('')
const displayInventoryList = ref([])
const length = ref(0)

watchEffect(() => {
  if (displayInventoryList.value.length === 0) {
    displayInventoryList.value = props.productList.sort((a, b) => a.order - b.order)
  } else if (searchText.value.length > 0) {
    const exactText = props.productList.find(e => String(e.name).toUpperCase() === searchText.value.toUpperCase())
    if (exactText !== undefined) {
      displayInventoryList.value = [exactText]
    }

    if (searchText.value.length === 1) {
      displayInventoryList.value = props.productList
        .filter(e => String(e.name).toUpperCase().startsWith(searchText.value.toUpperCase()))
        .sort((a, b) => String(a.name).localeCompare(String(b.name)))
    } else if (searchText.value.length > 1) {
      displayInventoryList.value = props.productList.filter(e => String(e.name).toUpperCase().includes(searchText.value.toUpperCase()))
    }
  } else {
    displayInventoryList.value = props.productList.sort((a, b) => a.order - b.order)
  }
})

const searchFunction = e => {
  if (e.target.value.length > 0) {
    searchText.value = e.target.value
    const exactText = props.productList.find(e => String(e.name).toUpperCase() === searchText.value.toUpperCase())
    if (exactText !== undefined) {
      displayInventoryList.value = [exactText]
    }

    if (e.target.value.length === 1) {
      displayInventoryList.value = props.productList
        .filter(e => String(e.name).toUpperCase().startsWith(searchText.value.toUpperCase()))
        .sort((a, b) => String(a.name).localeCompare(String(b.name)))
    } else if (e.target.value.length > 1) {
      displayInventoryList.value = props.productList.filter(e => String(e.name).toUpperCase().includes(searchText.value.toUpperCase()))
    }
  } else {
    searchText.value = ''
    displayInventoryList.value = props.productList.sort((a, b) => a.order - b.order)
  }
}

</script>

<template>
  <InputSet :isPrimary="false" :value="searchText" :label="'Search'" :placeholder="'Product name'" :type="'text'" @input="searchFunction" />
  <div v-if="productList.length < 4" class="flex flex-col gap-4 bg-transparent w-full h-full rounded">
    <div v-for="product in displayInventoryList">
      <Product :productID="product.id" :productName="product.name" :productPrice="product.price"
        :productQuantity="product.quantity" :productOrder="product.order" />
    </div>
  </div>
  <div v-else class="flex flex-col gap-4 bg-transparent w-full h-96 overflow-y-scroll rounded">
    <div v-for="product in displayInventoryList">
      <Product :productID="product.id" :productName="product.name" :productPrice="product.price"
        :productQuantity="product.quantity" :productOrder="product.order" />
    </div>
  </div>
</template>