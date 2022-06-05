<script setup>
import { ref } from 'vue';
import { addDoc } from 'firebase/firestore';
import { productsColRef } from '../../../firebase-config';
import InputSet from '../../common/input-set.vue';
import CustomButton from '../../common/custom-button.vue';

const product = ref({})
const productName = ref()
const price = ref()
const quantity = ref()



const submitHandler = e => {
  e.preventDefault();
  if (productName.value === undefined || productName.value === '') {
    alert("Please insert a product name.");
    return
  } else if (price.value === undefined || price.value === '') {
    alert("Please insert the price.");
    return
  } else if (quantity.value === undefined || quantity.value === '') {
    alert("Please insert the quantity.");
    return
  }
  product.value = {
    name: productName.value,
    price: price.value,
    quantity: quantity.value
  }
  addDoc(productsColRef, product.value)
  productName.value = ''
  price.value = ''
  quantity.value = ''
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
  <form class="flex flex-col gap-4 bg-emerald-400 w-full p-4 drop-shadow-md rounded" @submit="submitHandler">
    <InputSet :isPrimary="true" :value="productName" :label="'Product Name'" :type="'text'" :placeholder="''"
      :onChange="getProductName" />
    <InputSet :isPrimary="true" :value="price" :label="'Price'" :type="'number'" :placeholder="''"
      :onChange="getPrice" />
    <InputSet :isPrimary="true" :value="quantity" :label="'Quantity'" :type="'number'" :placeholder="''"
      :onChange="getQuantity" />
    <div class="flex items-center gap-4 mt-2">
      <CustomButton :isPrimary="false" />
      <CustomButton :isPrimary="true" />
    </div>
  </form>
</template>