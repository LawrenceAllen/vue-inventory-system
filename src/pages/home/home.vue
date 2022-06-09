<script setup>
import { ref } from 'vue';
import { onSnapshot } from 'firebase/firestore';
import { productsColRef } from '../../../firebase-config';
import InventoryList from '../../components/home/inventory-list.vue';
import AddProductForm from '../../components/home/add-product-form.vue';
import CustomButton from '../../common/custom-button.vue';

const productList = ref([])
const showAddProductForm = ref(false)

onSnapshot(productsColRef, (snap) => {
  productList.value = snap.docs.map(e => ({...e.data(), id: e.id}))
})

const setShowAddProductForm = () => {
  if (showAddProductForm.value) {
    showAddProductForm.value = false
  } else {
    showAddProductForm.value = true
  }
}

</script>

<template>
  <div class="flex flex-col justify-center items-center gap-4 w-full">
    <p class="text-3xl text-white">Inventory</p>
    <CustomButton 
      v-if="!showAddProductForm" 
      class="h-12 rounded"  
      :buttonType="'else'" 
      :value="'Add Product'" 
      :onClick="setShowAddProductForm"
    />
    <AddProductForm 
      :showComponent="showAddProductForm" 
      :productList="productList" 
      @cancelHandler="setShowAddProductForm"
    />
    <InventoryList :productList="productList"/>
  </div>
</template>