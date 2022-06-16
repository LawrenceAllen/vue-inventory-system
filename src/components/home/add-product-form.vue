<script lang="ts" setup>
import { ref } from 'vue';
import { addDoc } from 'firebase/firestore';
import { productsColRef } from '../../../firebase-config';
import InputSet from '../../common/input-set.vue';
import CustomButton from '../../common/custom-button.vue';

interface props {
  showComponent: boolean
  productList: any
}

const props = withDefaults(defineProps<props>(), {
  showComponent: false,
  productList: []
});

const productName = ref('')
const actualPrice = ref()
const retailPrice = ref()
const quantity = ref()

const submitHandler = e => {
  e.preventDefault();
  if (productName.value === undefined || productName.value === '') {
    alert("Please insert a product name.");
    return
  } else if (actualPrice.value === undefined || actualPrice.value === 0) {
    alert("Please insert the actual price.");
    return
  } else if (retailPrice.value === undefined || retailPrice.value === 0) {
    alert("Please insert the retail price.");
    return
  } else if (quantity.value === undefined || quantity.value === 0) {
    alert("Please insert the quantity.");
    return
  }
  const highest = Math.max(...props.productList.map(e => e.order), 0)
  addDoc(productsColRef, {
    name: productName.value,
    actual_price: actualPrice.value,
    retail_price: retailPrice.value,
    quantity: quantity.value,
    order: highest + 1
  })
  productName.value = ''
  actualPrice.value = undefined
  retailPrice.value =  undefined
  quantity.value = undefined
}

const getProductName = e => {
  productName.value = e.target.value
}

const getActualPrice = e => {
  actualPrice.value = Number(e.target.value)
}

const getRetailPrice = e => {
  retailPrice.value = Number(e.target.value)
}

const getQuantity = e => {
  quantity.value = Number(e.target.value)
}

</script>

<template>
  <div v-if="props.showComponent" class="bg-emerald-400 w-full p-4 m-4 drop-shadow-md rounded">
    <form class="flex flex-col gap-4" @submit="submitHandler">
      <InputSet 
        :isPrimary="true" 
        :value="productName" 
        :label="'Product Name'" 
        :type="'text'" 
        :placeholder="''"
        :onChange="getProductName" 
      />
      <InputSet 
        :isPrimary="true" 
        :value="actualPrice" 
        :label="'Actual Price'" 
        :type="'number'" 
        :placeholder="''"
        :onChange="getActualPrice"
      />
      <InputSet 
        :isPrimary="true" 
        :value="retailPrice" 
        :label="'Retail Price'" 
        :type="'number'" 
        :placeholder="''"
        :onChange="getRetailPrice"
      />
      <InputSet 
        :isPrimary="true" 
        :value="quantity" 
        :label="'Quantity'" 
        :type="'number'" 
        :placeholder="''" 
        :onChange="getQuantity" 
      />
      <div class="flex justify-between items-center gap-4 w-full">
        <CustomButton 
          class="text-black h-10 rounded" 
          :buttonType="'cancel'" 
          :value="'Cancel'"
          @click="$emit('cancelHandler')" 
        />
        <CustomButton 
          class="text-white h-10 rounded" 
          :buttonType="'save'" 
          :value="'Save'" 
        />
      </div>
    </form>
  </div>
  <div v-else></div>
</template>