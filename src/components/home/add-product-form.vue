<script lang="ts" setup>
import { ref } from 'vue';
import { addDoc } from 'firebase/firestore';
import { productsColRef } from '../../../firebase-config';
import InputSet from '../../common/input-set.vue';
import CustomButton from '../../common/custom-button.vue';

const productName = ref('')
const price = ref()
const quantity = ref()

interface props {
  showComponent: boolean
  productList: any
}

const props = withDefaults(defineProps<props>(), {
  showComponent: false,
  productList: []
});

const submitHandler = e => {
  e.preventDefault();
  if (productName.value === undefined || productName.value === '') {
    alert("Please insert a product name.");
    return
  } else if (price.value === undefined || price.value === 0) {
    alert("Please insert the price.");
    return
  } else if (quantity.value === undefined || quantity.value === 0) {
    alert("Please insert the quantity.");
    return
  }
  const highest = Math.max(...props.productList.map(e => e.order), 0)
  addDoc(productsColRef, {
    name: productName.value,
    price: Number(price.value),
    quantity: Number(quantity.value),
    order: highest + 1
  })
  productName.value = ''
  price.value = undefined
  quantity.value = undefined
}

const getProductName = e => {
  productName.value = e.target.value
}

const getPrice = e => {
  price.value = e.target.value
}

const getQuantity = e => {
  quantity.value = e.target.value
}

</script>

<template>
  <div v-if="props.showComponent" class="bg-emerald-400 w-full p-4 drop-shadow-md rounded">
    <form class="flex flex-col gap-4" @submit="submitHandler">
      <InputSet :isPrimary="true" :value="productName" :label="'Product Name'" :type="'text'" :placeholder="''"
        :onChange="getProductName" />
      <InputSet :isPrimary="true" :value="price" :label="'Price'" :type="'number'" :placeholder="''"
        :onChange="getPrice" />
      <InputSet :isPrimary="true" :value="quantity" :label="'Quantity'" :type="'number'" :placeholder="''"
        :onChange="getQuantity" />
      <CustomButton class="mt-2 h-12" :buttonType="'save'" :value="'Save'" />
    </form>
    <CustomButton class="mt-2 h-12" :buttonType="'cancel'" :value="'Cancel'" @click="$emit('cancelHandler')"/>
  </div>
  <div v-else></div>
</template>