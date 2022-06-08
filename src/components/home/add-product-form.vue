<script lang="ts" setup>
import { ref } from 'vue';
import { addDoc } from 'firebase/firestore';
import { productsColRef } from '../../../firebase-config';
import InputSet from '../../common/input-set.vue';
import CustomText from '../../common/custom-text.vue';
import CustomButton from '../../common/custom-button.vue';

const product = ref({})
const productName = ref()
const price = ref()
const quantity = ref()

interface props {
  showComponent: boolean
}

const props = withDefaults(defineProps<props>(), {
  showComponent: false
});

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
  <div v-if="props.showComponent" class="bg-emerald-400 w-full p-4 drop-shadow-md rounded">
    <CustomText class="text-white text-2xl text-center mb-6" :isPrimary="true" :value="'Add Product'"/>
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